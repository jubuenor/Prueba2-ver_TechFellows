from django.urls import path
from prueba2db.controllers.Data import DataController

# **
# * @description Routes of the Data
# **

urlpatterns = [
    path('data', DataController.getData),
]
