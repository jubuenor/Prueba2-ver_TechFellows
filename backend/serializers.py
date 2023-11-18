from rest_framework import serializers
from prueba2db.models import Query, Comment, Query_Comment


class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class Query_CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Query_Comment
        fields = '__all__'
