from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.Comment import CommentServices

# **
# * Class CommentController
# * @description Class that manages the requests to the Comment table
# **


class CommentController():
    # **
    # * @description Method to create a new Comment
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **
    @api_view(["POST"])
    def create(request, query_id):
        try:
            data = CommentServices.create(request.data, query_id)
            content = {
                "message": 'Comment successfully created!',
                "data": data
            }

            return Response(content, status=status.HTTP_201_CREATED)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to get all the Comments
    # * @param request Request received from the view
    # * @return Response with the result of the request
    # **

    @api_view(["GET"])
    def getAll(request, query_id):
        try:
            data = CommentServices.getAll(query_id)
            content = {
                "message": 'Comments successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to get a Comment by id
    # * @param request Request received from the view
    # * @param comment_id Id of the Comment to be retrieved
    # * @return Response with the result of the request
    # **

    @api_view(["GET"])
    def get(request, comment_id):
        try:
            data = CommentServices.get(comment_id)
            content = {
                "message": 'Comment successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # **
    # * @description Method to update a Comment by id
    # * @param request Request received from the view
    # * @param comment_id Id of the Comment to be updated
    # * @return Response with the result of the request
    # **

    @api_view(["PUT"])
    def update(request, comment_id):
        try:
            data = CommentServices.update(comment_id, request.data)
            content = {
                "message": 'Comment successfully updated!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # **
    # * @description Method to delete a Comment by id
    # * @param request Request received from the view
    # * @param comment_id Id of the Comment to be deleted
    # * @return Response with the result of the request
    # **
    @api_view(["DELETE"])
    def delete(request, comment_id):
        try:
            data = CommentServices.delete(comment_id)
            content = {
                "message": 'Comment successfully deleted!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
