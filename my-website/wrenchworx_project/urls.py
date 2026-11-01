from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from wrenchworx import views
from wrenchworx.admin import admin_site
from wrenchworx.seo import robots_txt, sitemap_xml

urlpatterns = [
    path("admin/", admin_site.urls),
    path("robots.txt", robots_txt, name="robots_txt"),
    path("sitemap.xml", sitemap_xml, name="sitemap"),
    path("", views.home, name="home"),
    path("service-request/", views.service_request, name="service_request"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
