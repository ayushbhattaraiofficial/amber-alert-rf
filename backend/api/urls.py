from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CircumstanceView,
    ClassificationView,
    ContactView,
    DescriptionView,
    IdentificationView,
    PhotoView,
    TokenIssuanceView,
    TokenRefreshView,
    UserRegistrationView,
    VehicleView,
    predict,
    save_data,
    send_case_details,
    send_filed_data,
    send_id,
    send_latest_data,
)

router = DefaultRouter()
router.register(
    r"identification", IdentificationView, basename="identification"
)
router.register(r"circumstance", CircumstanceView, basename="circumstance")
router.register(r"description", DescriptionView, basename="description")
router.register(r"vehicle", VehicleView, basename="vehicle")
router.register(r"contact", ContactView, basename="contact")
router.register(
    r"classification", ClassificationView, basename="classification"
)
router.register(r"photo", PhotoView, basename="photo")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/rid/", send_id, name="recent_id"),
    path("api/latest/", send_latest_data, name="send_latest_data"),
    path("api/predict/", predict, name="predict"),
    path("api/filed/", send_filed_data, name="send_filed_data"),
    path("api/save/", save_data, name="save_data"),
    path("api/details/<int:id>", send_case_details, name="send_case_details"),
    path(
        "api/register/",
        UserRegistrationView.as_view(),
        name="user_registration",
    ),
    path("api/login/", TokenIssuanceView.as_view(), name="token_issuance"),
    path(
        "api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
