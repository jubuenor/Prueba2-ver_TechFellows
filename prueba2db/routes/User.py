from django.urls import path
from prueba2db.controllers.User import UserController

urlpatterns = [
    path('user/getAll', UserController.getAll),
    path('user/create', UserController.create),
    path('user/get/<str:username>', UserController.get),
    path('user/update/<str:username>', UserController.update),
    path('user/delete/<str:username>', UserController.delete),
]
