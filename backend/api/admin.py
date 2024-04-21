from django.contrib import admin

from .models import (
    Circumstance,
    Classification,
    Contact,
    Description,
    Identification,
    Photo,
    Vehicle,
)

admin.site.register(Identification)
admin.site.register(Description)
admin.site.register(Circumstance)
admin.site.register(Vehicle)
admin.site.register(Contact)
admin.site.register(Classification)
admin.site.register(Photo)
