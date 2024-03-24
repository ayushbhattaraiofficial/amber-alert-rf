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
from rest_framework import views
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    IdentificationsView,
    DescriptionsView,
    CircumstancesView,
    LocationsView,
    PhysicalDescriptionsView,
    ClothingsView,
    TransportsView,
    ImagesView,
    ContactsView,
    ClassificationsView,
    UserRegistrationView,
    TokenIssuanceView,
    TokenRefreshView
)

router = DefaultRouter()
router.register(r'identifications', IdentificationsView, basename='identifications')
router.register(r'descriptions', DescriptionsView, basename='descriptions')
router.register(r'circumstances', CircumstancesView, basename='circumstances')
router.register(r'locations', LocationsView, basename='locations')
router.register(r'physical_descriptions', PhysicalDescriptionsView, basename='physical_descriptions')
router.register(r'clothings', ClothingsView, basename='clothings')
router.register(r'transports', TransportsView, basename='transports')
router.register(r'images', ImagesView, basename='images')
router.register(r'contacts', ContactsView, basename='contacts')
router.register(r'classifications', ClassificationsView, basename='classifications')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', UserRegistrationView.as_view(), name='user_registration'),
    path('api/login/', TokenIssuanceView.as_view(), name='token_issuance'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
