from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prueba2db.services.Comment import CommentServices


class CommentController():
    @api_view(["POST"])
    def create(request):
        try:
            data = CommentServices.create(request.data)
            content = {
                "message": 'Comment successfully created!',
                "data": data
            }

            return Response(content, status=status.HTTP_201_CREATED)

        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @api_view(["GET"])
    def getAll(request):
        try:
            data = CommentServices.getAll()
            content = {
                "message": 'Comments successfully retrieved!',
                "data": data
            }
            return Response(content, status=status.HTTP_200_OK)
        except (Exception):
            return Response('Error: ' + Exception, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
