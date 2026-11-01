import base64
import logging
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from .models import GalleryPhoto, ServiceRequest

logger = logging.getLogger(__name__)


def home(request):
    gallery_photos = GalleryPhoto.objects.filter(is_published=True)
    return render(request, "wrenchworx/home.html", {"gallery_photos": gallery_photos})


@require_POST
def service_request(request):
    name = request.POST.get("name", "").strip()
    phone = request.POST.get("phone", "").strip()
    message = request.POST.get("message", "").strip()
    if not name or not phone or not message:
        return JsonResponse({"ok": False}, status=400)
    service_request = ServiceRequest.objects.create(
        name=name[:120], phone=phone[:40], vehicle_problem=message
    )
    _send_service_request_sms(service_request)
    return JsonResponse({"ok": True})


def _send_service_request_sms(service_request):
    """Send a notification when Twilio is configured; never lose the saved request."""
    account_sid = settings.TWILIO_ACCOUNT_SID
    api_key_sid = settings.TWILIO_API_KEY_SID
    api_key_secret = settings.TWILIO_API_KEY_SECRET
    auth_token = settings.TWILIO_AUTH_TOKEN
    recipient = settings.SMS_NOTIFICATION_TO
    sender = settings.TWILIO_FROM_NUMBER
    messaging_service = settings.TWILIO_MESSAGING_SERVICE_SID
    credentials = (
        (api_key_sid, api_key_secret)
        if api_key_sid and api_key_secret
        else (account_sid, auth_token)
    )
    if not (
        account_sid
        and credentials[0]
        and credentials[1]
        and recipient
        and (sender or messaging_service)
    ):
        return

    body = (
        f"New WrenchWorx service request #{service_request.pk}\n"
        f"Name: {service_request.name}\nPhone: {service_request.phone}\n"
        f"Vehicle/problem: {service_request.vehicle_problem}"
    )[:1500]
    data = {"To": recipient, "Body": body}
    if messaging_service:
        data["MessagingServiceSid"] = messaging_service
    else:
        data["From"] = sender

    authorization = base64.b64encode(
        f"{credentials[0]}:{credentials[1]}".encode()
    ).decode()
    req = Request(
        f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json",
        data=urlencode(data).encode(),
        headers={"Authorization": f"Basic {authorization}"},
        method="POST",
    )
    try:
        with urlopen(req, timeout=8) as response:
            if response.status >= 300:
                logger.warning(
                    "Twilio returned HTTP %s for service request %s",
                    response.status,
                    service_request.pk,
                )
    except (HTTPError, URLError, TimeoutError, OSError) as exc:
        logger.warning(
            "SMS notification failed for service request %s: %s",
            service_request.pk,
            exc,
        )
