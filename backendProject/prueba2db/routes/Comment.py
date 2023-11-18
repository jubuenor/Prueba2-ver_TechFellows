from django.urls import path
from prueba2db.controllers.Comment import CommentController

# **
# * @description Routes of the Comment
# **
urlpatterns = [
    path('comment/<int:query_id>/create', CommentController.create),
    path('comment/<int:query_id>/getAll', CommentController.getAll),
    path('comment/get/<int:comment_id>', CommentController.get),
    path('comment/update/<int:comment_id>', CommentController.update),
    path('comment/delete/<int:comment_id>', CommentController.delete),
]
