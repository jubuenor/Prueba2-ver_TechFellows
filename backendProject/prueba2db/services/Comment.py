from prueba2db.models import Comment, Query, Query_Comment
from backend.serializers import CommentSerializer

# **
# * Class CommentServices
# * @description Class that manages the requests to the Comment table
# **


class CommentServices():
    # **
    # * @description Method to create a Comment
    # * @param comment Comment to create
    # * @param query_id Id of the Query to create the Comment
    # * @return Comment created
    # **

    def create(comment, query_id):
        query = Query.objects.get(id=query_id)
        if query is None:
            raise Exception('Query not found')

        comment = Comment.objects.create(
            username=comment['username'],
            comment=comment['comment'],
        )
        query_comment = Query_Comment.objects.create(
            query_id=query,
            comment_id=comment,
        )
        serializer = CommentSerializer(comment, many=False)
        return serializer.data

    # **
    # * @description Method to get all the Comments of a Query
    # * @param query_id Id of the Query to get the Comments
    # * @return Comments of the Query
    # **
    def getAll(query_id):
        query = Query.objects.get(id=query_id)
        if query is None:
            raise Exception('Query not found')

        comments = Comment.objects.filter(
            query_comment__query_id=query_id).order_by('-date')

        serializer = CommentSerializer(comments, many=True)
        return serializer.data
    # **
    # * @description Method to get a Comment by id
    # * @param comment_id Id of the Comment to get
    # * @return Comment
    # **

    def get(comment_id):
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            raise Exception('Comment not found')

        serializer = CommentSerializer(comment, many=False)
        return serializer.data
    # **
    # * @description Method to update a Comment
    # * @param comment_id Id of the Comment to update
    # * @param comment Comment to update
    # * @return Comment updated
    # **

    def update(comment_id, comment):
        commentDB = Comment.objects.get(id=comment_id)
        if commentDB is None:
            raise Exception('Comment not found')

        serializer = CommentSerializer(commentDB, data=comment, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            raise Exception(serializer.errors)
        return serializer.data
    # **
    # * @description Method to delete a Comment
    # * @param comment_id Id of the Comment to delete
    # * @return Comment deleted
    # **

    def delete(comment_id):
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            raise Exception('Comment not found')

        comment.delete()
        serializer = CommentSerializer(comment, many=False)
        return serializer.data
