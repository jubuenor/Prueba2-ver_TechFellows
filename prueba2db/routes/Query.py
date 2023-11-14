from django.urls import path
from prueba2db.controllers.Query import QueryController

urlpatterns = [
    path('query/getAll', QueryController.getAll),
    path('query/create', QueryController.create),
    path('query/get/<int:query_id>', QueryController.get),
    path('query/update/<int:query_id>', QueryController.update),
    path('query/delete/<int:query_id>', QueryController.delete),
    path('query/checkQuery', QueryController.checkQuery),
]
