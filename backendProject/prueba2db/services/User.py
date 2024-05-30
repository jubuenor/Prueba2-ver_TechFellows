import jwt
import environ
from loguru import logger

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

    @logger.catch
    def createUsername(user):
        logger.debug('Creating username...')
        token = jwt.encode(
            {'username': user['username']}, env('SECRET_KEY'), algorithm='HS256')
        return token
