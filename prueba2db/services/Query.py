from prueba2db.models import Query
from backend.serializers import QuerySerializer
from google.cloud import bigquery

client = bigquery.Client()


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

    def checkQuery(query):
        if query is None:
            raise Exception('Query does not exist!')
        if query["countries"] is None:
            raise Exception('Countries does not exist!')
        if query["series"] is None:
            raise Exception('Series does not exist!')
        if query["years"] is None:
            raise Exception('Years does not exist!')

        countries = '","'.join(query['countries'])
        series = '","'.join(query['series'])

        manual = query['years']['manual']
        years = query['years']['years']
        yearsQuery = ""
        if manual:
            years = ','.join(str(e) for e in years)
            yearsQuery = f"IN ({years})"
        else:
            years = ' AND '.join(str(e) for e in years)
            yearsQuery = f"BETWEEN {years}"

        QUERY = f"""
            SELECT country_code, indicator_code, year, value
            FROM bigquery-public-data.world_bank_intl_education.international_education
            WHERE country_code IN ("{countries}") AND indicator_code IN ("{series}") AND year {yearsQuery}
            ORDER BY country_code , indicator_code LIMIT 1000 
            """
        query_job = client.query(QUERY)
        rows = query_job.result()

        results = {}

        for row in rows:
            if row.country_code not in results:
                results[row.country_code] = {}
            if row.indicator_code not in results[row.country_code]:
                results[row.country_code][row.indicator_code] = {}
            results[row.country_code][row.indicator_code][row.year] = row.value

        return {
            "Query": QUERY,
            "result": results,
        }
