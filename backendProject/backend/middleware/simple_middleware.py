import jwt
from rest_framework import response
from rest_framework import status

import environ

env = environ.Env()
environ.Env.read_env()

private_methods = ['create', 'update', 'delete']


def simple_middleware(get_response):

    def middleware(request):

        if (request.method not in private_methods):
            return get_response(request)

        try:

            token = request.headers.get('Authorization')

            if token is None:
                return response.Response('Token not found!', status=status.HTTP_401_UNAUTHORIZED)

            usernameDecoded = jwt.decode(token.split()[1], env(
                'SECRET_KEY'), algorithms=['HS256'])

            if (usernameDecoded['username'] is None):
                raise Exception('Token is invalid!')

            return get_response(request)

        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return response.Response('Token is invalid!', status=status.HTTP_401_UNAUTHORIZED)

    return middleware
