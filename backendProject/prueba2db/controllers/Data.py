from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.Data import DataServices
from rest_framework import status

# **
# * Class QueryController
# * @description Class that manages the requests to the Query table
# **


class DataController():
    # **
    # * @description Method to get all the Queries
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **
    @api_view(["GET"])
    def getData(request):
        try:
            data = DataServices.getData()
            content = {
                "message": 'Countries successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
