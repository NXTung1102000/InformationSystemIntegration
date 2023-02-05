from functools import wraps
from flask import abort, g, request


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'Authorization' not in request.headers:
            abort(401)

        # token = Token.query.filter_by(token=request.headers['Authorization']).first()
        # if not token:
        #     abort(401)
        # user = User.query.filter_by(user_id=token.user_id).first()

        # if user is None:
        #     abort(401)
        # g.user = user
        # g.token = token

        return f(*args, **kwargs)            
    return decorated_function
