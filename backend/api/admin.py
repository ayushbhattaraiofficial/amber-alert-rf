from django.contrib import admin
from .models import Demographics, Circumstances, PhysicalDescription, Clothing, Transportation, Image, Contacts, ClassificationResult

admin.site.register(Demographics)
admin.site.register(Circumstances)
admin.site.register(PhysicalDescription)
admin.site.register(Clothing)
admin.site.register(Transportation)
admin.site.register(Image)
admin.site.register(Contacts)
admin.site.register(ClassificationResult)