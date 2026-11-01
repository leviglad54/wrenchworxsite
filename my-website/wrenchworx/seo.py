from django.conf import settings
from django.http import HttpResponse
from xml.sax.saxutils import escape


def public_site_context(request):
    return {"public_site_url": settings.PUBLIC_SITE_URL}


def robots_txt(request):
    body = "\n".join(
        [
            "User-agent: *",
            "Allow: /",
            f"Sitemap: {settings.PUBLIC_SITE_URL}/sitemap.xml",
            "",
        ]
    )
    return HttpResponse(body, content_type="text/plain; charset=utf-8")


def sitemap_xml(request):
    homepage = escape(f"{settings.PUBLIC_SITE_URL}/")
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"<url><loc>{homepage}</loc></url>"
        "</urlset>"
    )
    return HttpResponse(body, content_type="application/xml; charset=utf-8")
