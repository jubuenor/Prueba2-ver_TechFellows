from django.urls import path
from prueba2db.controllers.User import UserController

# **
# * @description Routes of the User
# **

urlpatterns = [
    path('user/username', UserController.createUsername),
]
