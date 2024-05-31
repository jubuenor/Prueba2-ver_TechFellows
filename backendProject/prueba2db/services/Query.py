from prueba2db.models import Query
from backend.serializers import QuerySerializer
from google.cloud import bigquery
import json
import logging
from loguru import logger
import sys

client = bigquery.Client()

# **
# * Class QueryServices
# * @description Class that manages the requests to the Query table
# **


class QueryServices():

    # **
    # * @description Method to create a Query
    # * @param query Query to create
    # * @return Query created
    # **
    @logger.catch
    def create(query):
        logger.debug('Creating query...')
        query = Query(query=query['query'], description=query['description'],
                      title=query['title'], username=query['username'])
        query.save()
        serializer = QuerySerializer(query, many=False)
        return serializer.data

    # **
    # * @description Method to get all the Queries
    # * @return Queries
    # **
    @logger.catch
    def getAll():
        logger.debug('Getting all queries...')
        queries = Query.objects.all().order_by('-date')
        serializer = QuerySerializer(queries, many=True)
        return serializer.data

    # **
    # * @description Method to get a Query by id
    # * @param query_id Id of the Query to get
    # * @return Query
    # **
    @logger.catch
    def get(query_id):
        logger.debug('Getting query by id...')
        query = Query.objects.get(id=query_id)
        if query is None:
            logger.error('Query does not exist')
            raise Exception('Query does not exist!')
        serializer = QuerySerializer(query, many=False)
        return serializer.data
    # **
    # * @description Method to update a Query
    # * @param query_id Id of the Query to update
    # * @param query Query to update
    # * @return Query updated
    # **

    @logger.catch
    def update(query_id, query):
        logger.debug('Updating query...')
        queryDB = Query.objects.get(id=query_id)
        if queryDB is None:
            logger.error('Query does not exist')
            raise Exception('Query does not exist!')

        serializer = QuerySerializer(queryDB, data=query, partial=True)
        if serializer.is_valid():
            serializer.save()
        else:
            raise Exception(serializer.errors)
        return serializer.data
    # **
    # * @description Method to delete a Query
    # * @param query_id Id of the Query to delete
    # * @return Query deleted
    # **

    @logger.catch
    def delete(query_id):
        logger.debug('Deleting query...')
        queryDB = Query.objects.get(id=query_id)
        if queryDB is None:
            logger.error('Query does not exist')
            raise Exception('Query does not exist!')

        queryDB = queryDB
        queryDB.delete()
        serializer = QuerySerializer(queryDB, many=False)
        return serializer.data
    # **
    # * @description Method to get the results of a Query
    # * @param query Query to get the results
    # * @return Results of the Query
    # **

    @logger.catch
    def checkQuery(query):
        # Check if query exists
        logger.debug('Checking query...')
        if query is None:
            logger.error('Query does not exist')
            raise Exception('Query does not exist!')

        # Check if query is valid

        if query["countries"] is None:
            raise Exception('Countries does not exist!')
        if query["series"] is None:
            raise Exception('Series does not exist!')
        if query["years"] is None:
            raise Exception('Years does not exist!')

        # Query format
        
        

        countries = ','.join(query['countries'])
        series = ','.join(query['series'])
        manual = query['years']['manual']
        years = query['years']['years']
        QUERY = ""
        job_config = {}

        
        if manual:
            logger.debug("Selected manual years for query")
            QUERY = f"""
            SELECT country_code, indicator_code, year, value
            FROM bigquery-public-data.world_bank_intl_education.international_education
            WHERE country_code IN UNNEST(SPLIT(@countries, ',')) AND indicator_code IN UNNEST(SPLIT(@series, ',')) AND year IN UNNEST(@years)
            ORDER BY country_code , indicator_code LIMIT 1000 
            """
            job_config = bigquery.QueryJobConfig(
                query_parameters=[
                    bigquery.ScalarQueryParameter("countries", "STRING", countries),
                    bigquery.ScalarQueryParameter("series", "STRING", series),
                    bigquery.ArrayQueryParameter("years", "INT64", years),
                ]
            )
        else:
            logger.debug("Selected slider years for query")
            QUERY = f"""
            SELECT country_code, indicator_code, year, value
            FROM bigquery-public-data.world_bank_intl_education.international_education
            WHERE country_code IN UNNEST(SPLIT(@countries, ',')) AND indicator_code IN UNNEST(SPLIT(@series, ',')) AND year BETWEEN @year1 AND @year2
            ORDER BY country_code , indicator_code LIMIT 1000 
            """

            job_config = bigquery.QueryJobConfig(
                query_parameters=[
                    bigquery.ScalarQueryParameter("countries", "STRING", countries),
                    bigquery.ScalarQueryParameter("series", "STRING", series),
                    bigquery.ScalarQueryParameter("year1", "INT64", years[0]),
                    bigquery.ScalarQueryParameter("year2", "INT64", years[1]),
                ]
            )
             

        results = {}

        # Execute query

        query_job = client.query(QUERY, job_config=job_config)
        rows = query_job.result()

        # Format results in a dictionary

        for row in rows:
            if row.country_code not in results:
                results[row.country_code] = {}
            if row.indicator_code not in results[row.country_code]:
                results[row.country_code][row.indicator_code] = {}
            results[row.country_code][row.indicator_code][row.year] = row.value

        # Return results
        logger.success('Query executed successfully')
        return {
            "query": json.dumps(query),
            "results": results,
        }
