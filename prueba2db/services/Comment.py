from prueba2db.models import Comment, Query, Query_Comment
from backend.serializers import CommentSerializer


class CommentServices():

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

    def getAll(query_id):
        query = Query.objects.get(id=query_id)
        if query is None:
            raise Exception('Query not found')

        comments = Comment.objects.filter(
            query_comment__query_id=query_id).order_by('-date')

        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def get(comment_id):
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            raise Exception('Comment not found')

        serializer = CommentSerializer(comment, many=False)
        return serializer.data

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

    def delete(comment_id):
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            raise Exception('Comment not found')

        comment.delete()
        serializer = CommentSerializer(comment, many=False)
        return serializer.data
