from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from wrenchworx import views
from wrenchworx.admin import admin_site

urlpatterns = [
    path("admin/", admin_site.urls),
    path("", views.home, name="home"),
    path("service-request/", views.service_request, name="service_request"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
