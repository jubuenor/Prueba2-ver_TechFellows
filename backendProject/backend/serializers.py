from rest_framework import serializers
from prueba2db.models import Query, Comment, Query_Comment

# **
# * Class QuerySerializer
# * @description Class that represents the QuerySerializer
# **


class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'

# **
# * Class CommentSerializer
# * @description Class that represents the CommentSerializer
# **


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# **
# * Class Query_CommentSerializer
# * @description Class that represents the Query_CommentSerializer
# **


class Query_CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Query_Comment
        fields = '__all__'
