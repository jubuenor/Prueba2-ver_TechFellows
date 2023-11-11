from prueba2db.models import Query
from backend.serializers import QuerySerializer


class QueryServices():

    def create(query):
        queryDB = Query.objects.filter(query=query['query'])
        if queryDB.exists():
            raise Exception('Query already exists!')

        query = Query(query=query['query'], comment=query['comment'])
        query.save()
        serializer = QuerySerializer(query, many=False)
        return serializer.data

    def getAll():
        queries = Query.objects.all()
        serializer = QuerySerializer(queries, many=True)
        return serializer.data

    def get(query_id):
        query = Query.objects.get(id=query_id)
        if query is None:
            raise Exception('Query does not exist!')
        serializer = QuerySerializer(query, many=False)
        return serializer.data

    def update(query_id, query):
        queryDB = Query.objects.get(id=query_id)
        if queryDB is None:
            raise Exception('Query does not exist!')

        queryDB = queryDB
        queryDB.query = query['query']
        queryDB.comment = query['comment']
        queryDB.save()
        serializer = QuerySerializer(queryDB, many=False)
        return serializer.data

    def delete(query_id):
        queryDB = Query.objects.get(id=query_id)
        if queryDB is None:
            raise Exception('Query does not exist!')

        queryDB = queryDB
        queryDB.delete()
        serializer = QuerySerializer(queryDB, many=False)
        return serializer.data
