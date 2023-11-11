from django.db import models

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)


class Query(models.Model):
    id = models.AutoField(primary_key=True)
    query = models.CharField(max_length=1000)
    comment = models.CharField(max_length=1000)
    date = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=1000)
    date = models.DateTimeField(auto_now_add=True)


class Query_Comment(models.Model):
    id = models.AutoField(primary_key=True)
    query_id = models.ForeignKey(Query, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comment, on_delete=models.CASCADE)
