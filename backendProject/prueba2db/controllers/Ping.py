from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# **
# * Class QueryController
# * @description Class that manages the requests to the Query table
# **


class PingController():
    # **
    # * @description Method to get all the Queries
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **
    @api_view(["GET"])
    def ping(request):
        return Response("Pong", status=status.HTTP_200_OK)
