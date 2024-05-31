from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.User import UserServices
from rest_framework import status
from loguru import logger

# **
# * Class UserController
# * @description Class that manages the requests to the User table
# **


class UserController():

    # **
    # * @description Method to get all the Users
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **
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
            logger.critical('Error creating user')
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
