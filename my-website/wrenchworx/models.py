from django.db import models


class ServiceRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        SCHEDULED = "scheduled", "Scheduled"
        COMPLETED = "completed", "Completed"
        DECLINED = "declined", "Declined"

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    vehicle_problem = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    preferred_time = models.DateTimeField(blank=True, null=True)
    internal_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "service request"

    def __str__(self):
        return f"{self.name} — {self.phone} ({self.get_status_display()})"


class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    starting_price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    active = models.BooleanField(default=True)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class ServiceArea(models.Model):
    town = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True)
    active = models.BooleanField(default=True)
    notes = models.CharField(max_length=240, blank=True)

    class Meta:
        ordering = ["town", "region"]

    def __str__(self):
        return f"{self.town}, {self.region}" if self.region else self.town


class BusinessProfile(models.Model):
    business_name = models.CharField(max_length=120, default="WrenchWorx")
    phone = models.CharField(max_length=40, default="(717) 331-2590")
    email = models.EmailField(blank=True)
    service_area_summary = models.CharField(
        max_length=200, default="Waynesboro and surrounding areas"
    )
    hours = models.CharField(max_length=200, blank=True)
    booking_notes = models.TextField(blank=True)

    def __str__(self):
        return self.business_name


class GalleryPhoto(models.Model):
    caption = models.CharField(max_length=160)
    image = models.ImageField(upload_to="gallery/%Y/%m/")
    alt_text = models.CharField(
        max_length=180,
        blank=True,
        help_text="Briefly describe the photo for visitors using a screen reader.",
    )
    display_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "-created_at"]
        verbose_name = "gallery photo"
        verbose_name_plural = "gallery photos"

    def __str__(self):
        return self.caption
