from django.contrib import admin
from .models import (
    Identifications,
    Descriptions,
    Circumstances,
    Locations,
    PhysicalDescriptions,
    Clothings,
    Transports,
    Images,
    Contacts,
    Classifications,
)

admin.site.register(Identifications)
admin.site.register(Descriptions)
admin.site.register(Circumstances)
admin.site.register(Locations)
admin.site.register(PhysicalDescriptions)
admin.site.register(Clothings)
admin.site.register(Transports)
admin.site.register(Images)
admin.site.register(Contacts)
admin.site.register(Classifications)
