import jwt
import environ

env = environ.Env()
environ.Env.read_env()

# **
# * @description Class to create a token for the username
# **


class UserServices():

    # **
    # * @description Method to create a token for the username
    # * @param user User to create the token
    # * @return Token created
    # **

    def createUsername(user):
        token = jwt.encode(
            {'username': user['username']}, env('SECRET_KEY'), algorithm='HS256')
        return token
