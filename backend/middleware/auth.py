from functools import wraps
from flask import abort, g, request
from repository.user_repo import find_by_token


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'Authorization' not in request.headers:
            abort(401)
        token = request.headers['Authorization'].split(' ')[-1]

        user = find_by_token(token=token)
        if not user:
            abort(401)

        g.user = user

        return f(*args, **kwargs)            
    return decorated_function
