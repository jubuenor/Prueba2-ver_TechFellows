from google.cloud import bigquery

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
    def getData():

        # Query to get the countries and series

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

        return {
            "countries": countries,
            "series": series
        }
