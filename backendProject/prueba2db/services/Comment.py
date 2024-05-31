from prueba2db.models import Comment, Query, Query_Comment
from backend.serializers import CommentSerializer
from loguru import logger

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

    @logger.catch
    def create(comment, query_id):
        logger.debug('Creating comment query...')
        query = Query.objects.get(id=query_id)
        if query is None:
            logger.error('Query not found')
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
    
    @logger.catch
    def getAll(query_id):
        logger.debug('Getting all comment queries...')
        query = Query.objects.get(id=query_id)
        if query is None:
            logger.error('Query not found')
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

    @logger.catch
    def get(comment_id):
        logger.debug('Getting comment by id...')
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            logger.error('Comment not found')
            raise Exception('Comment not found')

        serializer = CommentSerializer(comment, many=False)
        return serializer.data
    # **
    # * @description Method to update a Comment
    # * @param comment_id Id of the Comment to update
    # * @param comment Comment to update
    # * @return Comment updated
    # **

    @logger.catch
    def update(comment_id, comment):
        logger.debug('Updating comment...')
        commentDB = Comment.objects.get(id=comment_id)
        if commentDB is None:
            logger.error('Comment not found')
            raise Exception('Comment not found')

        serializer = CommentSerializer(commentDB, data=comment, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            logger.error('Serializer error')
            raise Exception(serializer.errors)
        return serializer.data
    # **
    # * @description Method to delete a Comment
    # * @param comment_id Id of the Comment to delete
    # * @return Comment deleted
    # **

    @logger.catch
    def delete(comment_id):
        logger.debug('Deleting comment...')
        comment = Comment.objects.get(id=comment_id)
        if comment is None:
            logger.error('Comment not found')
            raise Exception('Comment not found')

        comment.delete()
        serializer = CommentSerializer(comment, many=False)
        return serializer.data
