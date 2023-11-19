from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.Query import QueryServices
from rest_framework import status

# **
# * Class QueryController
# * @description Class that manages the requests to the Query table
# **


class QueryController():
    # **
    # * @description Method to create a new Query
    # * @param request Request received from the view
    # * @param username Username of the Query to be created
    # * @param title Title of the Query to be created
    # * @param query Query of the Query to be created
    # * @param description Description of the Query to be created
    # * @return Response with the result of the request
    # **
    @api_view(["POST"])
    def create(request):
        try:
            data = QueryServices.create(request.data)
            content = {
                "message": 'Query successfully created!',
                "data": data
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # **
    # * @description Method to get all the Queries
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **
    @api_view(["GET"])
    def getAll(request):
        try:
            data = QueryServices.getAll()
            content = {
                "message": 'Queries successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to get a Query by id
    # * @param request Request received from the view
    # * @param query_id Id of the Query to be retrieved
    # * @return Response with the result of the request
    # **

    @api_view(["GET"])
    def get(request, query_id):
        try:
            data = QueryServices.get(query_id)
            content = {
                "message": 'Query successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to update a Query
    # * @param request Request received from the view
    # * @param query_id Id of the Query to be updated
    # * @return Response with the result of the request
    # **

    @api_view(["PUT"])
    def update(request, query_id):
        try:
            data = QueryServices.update(query_id, request.data)
            content = {
                "message": 'Query successfully updated!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to delete a Query
    # * @param request Request received from the view
    # * @param query_id Id of the Query to be deleted
    # * @return Response with the result of the request
    # **

    @api_view(["DELETE"])
    def delete(request, query_id):
        try:
            data = QueryServices.delete(query_id)
            content = {
                "message": 'Query successfully deleted!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to check a Query
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **

    @api_view(["POST"])
    def checkQuery(request):
        try:
            data = QueryServices.checkQuery(request.data)
            content = {
                "message": 'Query successfully checked!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except Exception as error:
            return Response('Error: ' + str(error), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
