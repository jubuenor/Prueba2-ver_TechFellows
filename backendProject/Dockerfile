FROM python:3.9-alpine

WORKDIR /app

RUN pip install psycopg2-binary

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
