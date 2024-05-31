from google.cloud import bigquery
from loguru import logger

client = bigquery.Client()

# **
# * Class DataServices
# * @description Class that manages the requests the data needed for the app
# **


class DataServices():
    # **
    # * @description Method to get the data needed for the app
    # * @return Data needed for the app
    # **
    
    @logger.catch
    def getData():

        # Query to get the countries and series
        logger.debug('Getting countries and series...')
        
        QUERY = """
            SELECT DISTINCT country_code, short_name
            FROM bigquery-public-data.world_bank_intl_education.country_summary
            ORDER BY short_name
            """

        countries = {}

        # Execute query

        query_job = client.query(QUERY)
        rows = query_job.result()

        # Format results in a dictionary

        for row in rows:
            countries[row.country_code] = row.short_name
        
        logger.success('Successfully fetched countries and series')
            
        logger.debug('Getting series codes and indicator names...')
        QUERY = """
            SELECT DISTINCT series_code, indicator_name
            FROM bigquery-public-data.world_bank_intl_education.series_summary
            ORDER BY indicator_name
            """

        series = {}

        # Execute query

        query_job = client.query(QUERY)
        rows = query_job.result()

        # Format results in a dictionary

        for row in rows:
            series[row.series_code] = row.indicator_name
        
        logger.success('Successfully fetched series codes and indicator names')

        return {
            "countries": countries,
            "series": series
        }
