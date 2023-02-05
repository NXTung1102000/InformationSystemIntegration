from flask import Blueprint, request, g
from controller.product_controller import *


mod = Blueprint('product', __name__, url_prefix='/product')


@mod.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def product_handle():
    if request.method == 'GET':
        id = request.args.get('id')
        list_product = get(id)
        return {'status': 0, 'data': list_product}

    elif request.method == 'POST':
        data = request.json
        result = add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 400

    elif request.method == 'PUT':
        data = request.form
        id = int(data.get('id'))
        result = update(id, data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not update'}, 400

    elif request.method == 'DELETE':
        id = request.args.get('id')
        result = delete(id)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not delete'}, 400

    return 


@mod.route('/search', methods=['GET'])
def search():
    return