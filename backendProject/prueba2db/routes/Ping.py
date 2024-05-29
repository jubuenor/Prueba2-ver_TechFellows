from django.urls import path
from prueba2db.controllers.Ping import PingController

# **
# * @description Routes of the Comment
# **
urlpatterns = [
    path('', PingController.ping),
]
