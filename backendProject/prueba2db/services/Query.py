from prueba2db.models import Query
from backend.serializers import QuerySerializer
from google.cloud import bigquery
import json

client = bigquery.Client()


class QueryServices():

    def create(query):
        query = Query(query=query['query'], description=query['description'],
                      title=query['title'], username=query['username'])
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

        serializer = QuerySerializer(queryDB, data=query, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            raise Exception(serializer.errors)
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

        results = {}

        query_job = client.query(QUERY)
        rows = query_job.result()

        print(rows)

        for row in rows:
            if row.country_code not in results:
                results[row.country_code] = {}
            if row.indicator_code not in results[row.country_code]:
                results[row.country_code][row.indicator_code] = {}
            results[row.country_code][row.indicator_code][row.year] = row.value

        return {
            "query": json.dumps(query),
            "results": results,
        }

    def getCountries():
        QUERY = """
            SELECT DISTINCT country_code, short_name
            FROM bigquery-public-data.world_bank_intl_education.country_summary
            ORDER BY short_name
            """

        results = {}

        query_job = client.query(QUERY)
        rows = query_job.result()

        for row in rows:
            results[row.country_code] = row.country_name

        return results

    def getSeries():
        QUERY = """
            SELECT DISTINCT series_code, indicator_name
            FROM bigquery-public-data.world_bank_intl_education.series_summary
            ORDER BY indicator_name
            """

        results = {}

        query_job = client.query(QUERY)
        rows = query_job.result()

        for row in rows:
            results[row.indicator_code] = row.indicator_name

        return results
