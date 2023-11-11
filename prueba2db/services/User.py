from prueba2db.models import User
from backend.serializers import UserSerializer


class UserServices():
    def create(user):
        userDB = User.objects.filter(username=user['username'])
        if userDB.exists():
            raise Exception('User already exists!')

        user = User(username=user['username'])
        user.save()
        serializer = UserSerializer(user, many=False)
        return serializer.data

    def getAll():
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return serializer.data

    def get(username):
        user = User.objects.get(username=username)
        if user is None:
            raise Exception('User does not exist!')
        serializer = UserSerializer(user, many=False)
        return serializer.data

    def update(username, user):
        userDB = User.objects.get(username=username)
        if userDB is None:
            raise Exception('User does not exist!')

        userDB = userDB
        userDB.username = user['username']
        userDB.save()
        serializer = UserSerializer(userDB, many=False)
        return serializer.data

    def delete(username):
        userDB = User.objects.get(username=username)
        if userDB is None:
            raise Exception('User does not exist!')

        userDB = userDB
        userDB.delete()
        serializer = UserSerializer(userDB, many=False)
        return serializer.data
