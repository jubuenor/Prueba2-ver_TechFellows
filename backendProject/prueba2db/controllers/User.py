from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.User import UserServices
from rest_framework import status


class UserController():

    @api_view(["POST"])
    def createUsername(request):
        try:
            data = UserServices.createUsername(request.data)

            content = {
                "message": 'Username successfully created!',
                "data": data
            }

            return Response(content, status=status.HTTP_201_CREATED)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
