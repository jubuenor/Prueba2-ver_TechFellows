from django.urls import path
from prueba2db.controllers.Data import DataController

urlpatterns = [
    path('data', DataController.getData),
]
