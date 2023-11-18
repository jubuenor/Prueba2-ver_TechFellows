from google.cloud import bigquery

client = bigquery.Client()


class DataServices():
    def getData():
        QUERY = """
            SELECT DISTINCT country_code, short_name
            FROM bigquery-public-data.world_bank_intl_education.country_summary
            ORDER BY short_name
            """

        countries = {}

        query_job = client.query(QUERY)
        rows = query_job.result()

        for row in rows:
            countries[row.country_code] = row.short_name

        QUERY = """
            SELECT DISTINCT series_code, indicator_name
            FROM bigquery-public-data.world_bank_intl_education.series_summary
            ORDER BY indicator_name
            """

        series = {}

        query_job = client.query(QUERY)
        rows = query_job.result()

        for row in rows:
            series[row.series_code] = row.indicator_name

        return {
            "countries": countries,
            "series": series
        }
