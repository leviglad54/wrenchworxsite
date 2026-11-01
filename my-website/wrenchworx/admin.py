from django.contrib import admin
from django.utils.html import format_html

from .models import BusinessProfile, GalleryPhoto, Service, ServiceArea, ServiceRequest


class WrenchWorxAdminSite(admin.AdminSite):
    site_header = "WrenchWorx Service Manager"
    site_title = "WrenchWorx Admin"
    index_title = "Manage your mobile mechanic business"
    index_template = "admin/wrenchworx_index.html"

    def index(self, request, extra_context=None):
        requests = ServiceRequest.objects.all()
        dashboard_context = {
            "new_request_count": requests.filter(
                status=ServiceRequest.Status.NEW
            ).count(),
            "scheduled_request_count": requests.filter(
                status=ServiceRequest.Status.SCHEDULED
            ).count(),
            "open_request_count": requests.exclude(
                status__in=(
                    ServiceRequest.Status.COMPLETED,
                    ServiceRequest.Status.DECLINED,
                )
            ).count(),
            "active_service_count": Service.objects.filter(active=True).count(),
            "active_area_count": ServiceArea.objects.filter(active=True).count(),
            "published_gallery_photo_count": GalleryPhoto.objects.filter(
                is_published=True
            ).count(),
            "recent_requests": requests[:6],
        }
        dashboard_context.update(extra_context or {})
        return super().index(request, extra_context=dashboard_context)


admin_site = WrenchWorxAdminSite(name="admin")


@admin.register(ServiceRequest, site=admin_site)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "status", "created_at", "preferred_time")
    list_filter = ("status", "created_at")
    search_fields = ("name", "phone", "vehicle_problem")
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("status",)
    date_hierarchy = "created_at"
    fieldsets = (
        ("Customer", {"fields": ("name", "phone", "vehicle_problem")}),
        ("Follow-up", {"fields": ("status", "preferred_time", "internal_notes")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(Service, site=admin_site)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "starting_price", "active", "display_order")
    list_editable = ("starting_price", "active", "display_order")
    search_fields = ("name", "description")


@admin.register(ServiceArea, site=admin_site)
class ServiceAreaAdmin(admin.ModelAdmin):
    list_display = ("town", "region", "active")
    list_editable = ("active",)
    search_fields = ("town", "region")


@admin.register(BusinessProfile, site=admin_site)
class BusinessProfileAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not BusinessProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(GalleryPhoto, site=admin_site)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = (
        "photo_preview",
        "caption",
        "display_order",
        "is_published",
        "created_at",
    )
    list_display_links = ("photo_preview", "caption")
    list_editable = ("display_order", "is_published")
    list_filter = ("is_published", "created_at")
    search_fields = ("caption", "alt_text")
    readonly_fields = ("photo_preview", "created_at")
    fields = (
        "caption",
        "image",
        "alt_text",
        "display_order",
        "is_published",
        "photo_preview",
        "created_at",
    )
    ordering = ("display_order", "-created_at")

    @admin.display(description="Preview")
    def photo_preview(self, obj):
        if not obj or not obj.image:
            return "Choose a photo to see a preview."
        return format_html(
            '<img src="{}" alt="" style="max-width: 240px; max-height: 150px; object-fit: cover; border-radius: 3px;">',
            obj.image.url,
        )
