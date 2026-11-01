
# WrenchWorx

The WrenchWorx site runs on Django. Its original single-page layout, responsive styling, images, anchor sections, and mobile navigation are retained.

## Run locally

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Open http://127.0.0.1:8000.

## Admin dashboard

Run database migrations and create a private administrator account:

```sh
python manage.py migrate
python manage.py createsuperuser
```

Then sign in at http://127.0.0.1:8000/admin/. The dashboard tracks callback requests and their follow-up status, and lets you manage service listings, service areas, business contact details, and gallery photos with captions. Callback requests are saved in Django and appear in the Service Requests section.

## SMS notifications

Set `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`, `SMS_NOTIFICATION_TO`, and either `TWILIO_FROM_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID` in the environment. The account Auth Token can be used instead of an API key, but API keys are preferred. Twilio texts the configured destination when a service request is submitted. Requests remain saved in Django if SMS is not configured or Twilio is temporarily unavailable.

For local setup, copy `.env.example` to `.env` and fill in your Twilio values. Use international format for phone numbers, such as `+17175551234`.

## Deploying to Vercel

Connect the GitHub repository to Vercel and set the project Root Directory to `my-website`. Pushes to `main` deploy through Vercel.

Set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_DEBUG=false`, `DATABASE_URL`, and `DATABASE_URL_UNPOOLED` in Vercel’s Production environment. Use the Neon pooled URL for runtime `DATABASE_URL`; Vercel’s production build hook uses the unpooled URL to run `python manage.py migrate --noinput` before deployment. Preview builds skip migrations.

Create the production administrator account against the Neon database after deployment by running `python manage.py createsuperuser` with the production database URL configured. Vercel’s function filesystem is temporary, so configure durable external media storage before relying on admin photo uploads in production. Add the Twilio environment variables only if you want SMS notifications enabled.
