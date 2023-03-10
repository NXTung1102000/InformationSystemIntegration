from flask import Blueprint, request, g
from controller import user_controller
from middleware.auth import login_required


mod = Blueprint('user', __name__, url_prefix='/user')


@mod.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def user_handle():
    if request.method == 'GET':
        id = request.args.get('id')
        list_user = user_controller.get(id)
        return {'data': list_user}

    elif request.method == 'POST':
        data = request.json
        result = user_controller.add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 400

    elif request.method == 'PUT':
        data = request.form
        id = int(data.get('id'))
        result = user_controller.update(id, data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not update'}, 400

    elif request.method == 'DELETE':
        id = request.args.get('id')
        result = user_controller.delete(id)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not delete'}, 400

    return