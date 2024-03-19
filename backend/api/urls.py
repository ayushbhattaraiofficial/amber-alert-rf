"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    DemographicsList,
    CircumstancesList,
    PhysicalDescriptionList,
    ClothingList,
    TransportationList,
    ImageList,
    ContactsList,
    ClassificationResultList
)

router = DefaultRouter()
router.register(r'demographics', DemographicsList, basename='demographics')
router.register(r'circumstances', CircumstancesList, basename='circumstances')
router.register(r'physical_description', PhysicalDescriptionList, basename='physical_description')
router.register(r'clothing', ClothingList, basename='clothing')
router.register(r'transportation', TransportationList, basename='transportation')
router.register(r'image', ImageList, basename='image')
router.register(r'contacts', ContactsList, basename='contacts')
router.register(r'classification_result', ClassificationResultList, basename='classification_result')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login', obtain_auth_token, name='api_login')
]
