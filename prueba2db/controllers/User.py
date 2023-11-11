from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.User import UserServices
from rest_framework import status


class UserController():

    @api_view(["POST"])
    def create(request):
        try:
            data = UserServices.create(request.data)

            content = {
                "message": 'User successfully created!',
                "data": data
            }

            return Response(content, status=status.HTTP_201_CREATED)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["GET"])
    def getAll(request):
        try:
            data = UserServices.getAll()

            content = {
                "message": 'Users successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["GET"])
    def get(request, username):
        try:
            data = UserServices.get(username)

            content = {
                "message": 'User successfully retrieved!',
                "data": data
            }

            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["PUT"])
    def update(request, username):
        try:
            data = UserServices.update(username, request.data)

            content = {
                "message": 'User successfully updated!',
                "data": data
            }

            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["DELETE"])
    def delete(request, username):
        try:
            data = UserServices.delete(username)

            content = {
                "message": 'User successfully deleted!',
                "data": data
            }

            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
