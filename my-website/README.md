# WrenchWorx

The WrenchWorx site now runs on Django. The original single-page layout, responsive CSS, images, anchor sections, and mobile navigation are retained.

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

Then sign in at http://127.0.0.1:8000/admin/. The dashboard tracks callback requests and their follow-up status, and lets you manage service listings, service areas, and business contact details. Callback requests are saved directly in Django and appear in the Service Requests section.

## SMS notifications

Set `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY_SID`, `TWILIO_API_KEY_SECRET`, `SMS_NOTIFICATION_TO`, and either `TWILIO_FROM_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID` in the environment. The account Auth Token can be used instead of an API key, but API keys are preferred. Twilio will text the configured destination when a service request is submitted. Add the same variables to your deployment environment for production. Requests remain saved in Django if SMS is not configured or Twilio is temporarily unavailable.

For local setup, copy `.env.example` to `.env` and fill in your Twilio values. Use international format for phone numbers, such as `+17175551234`.

## Deploying to Vercel

Import the GitHub repository into Vercel and set **Root Directory** to `my-website`. Vercel detects Django from `manage.py`, installs `requirements.txt`, runs `collectstatic`, and serves static assets through its CDN. The GitHub Pages workflow has been removed; after the repository is connected, pushes to the production branch deploy through Vercel.

Set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, and `DATABASE_URL` in Vercel’s production environment. `DATABASE_URL` should point to a managed PostgreSQL database; the app keeps using SQLite for local development when that variable is absent. Set `DJANGO_DEBUG=false` in production. Run `python manage.py migrate` and create the production administrator account against the configured database.

Vercel’s function filesystem is temporary. Configure durable external media storage before relying on admin photo uploads in production; local `media/` storage is intended for development. Add the Twilio environment variables from `.env.example` only if you want SMS notifications enabled.
