from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.Query import QueryServices
from rest_framework import status


class QueryController():
    @api_view(["POST"])
    def create(request):
        try:
            data = QueryServices.create(request.data)
            content = {
                "message": 'Query successfully created!',
                "data": data
            }
            return Response(content, status=status.HTTP_201_CREATED)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["GET"])
    def getAll(request):
        try:
            data = QueryServices.getAll()
            content = {
                "message": 'Queries successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["GET"])
    def get(request, query_id):
        try:
            data = QueryServices.get(query_id)
            content = {
                "message": 'Query successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["PUT"])
    def update(request, query_id):
        try:
            data = QueryServices.update(query_id, request.data)
            content = {
                "message": 'Query successfully updated!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["DELETE"])
    def delete(request, query_id):
        try:
            data = QueryServices.delete(query_id)
            content = {
                "message": 'Query successfully deleted!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
