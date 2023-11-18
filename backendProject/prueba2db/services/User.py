import jwt
import environ

env = environ.Env()
environ.Env.read_env()


class UserServices():
    def createUsername(user):
        token = jwt.encode(
            {'username': user['username']}, env('SECRET_KEY'), algorithm='HS256')
        return token
