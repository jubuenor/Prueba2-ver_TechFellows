from django.urls import path
from prueba2db.controllers.User import UserController

urlpatterns = [
    path('user/username', UserController.createUsername),
]
