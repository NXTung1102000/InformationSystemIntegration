from flask import Blueprint, request, g
from controller import product_controller
from middleware.auth import login_required

from flask import send_file
from init_app import app


mod = Blueprint('product', __name__, url_prefix='/product')


@mod.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def product_handle():
    if request.method == 'GET':
        id = request.args.get('id')
        list_product = product_controller.get(id)
        return {'data': list_product}, 200

    elif request.method == 'POST':
        data = request.json
        result = product_controller.add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 400

    elif request.method == 'PUT':
        data = request.form
        id = int(data.get('id'))
        result = product_controller.update(id, data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not update'}, 400

    elif request.method == 'DELETE':
        id = request.args.get('id')
        result = product_controller.delete(id)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not delete'}, 400

    return 


@mod.route('/search', methods=['GET'])
def search():
    param = request.args
    result = product_controller.search_product(param)
    return {'data': result}, 200


@mod.route('/count-by-category', methods=['GET'])
def count_by_category():
    result = product_controller.static_category()
    return {'data': dict(result)}, 200


# @mod.route('/image', methods=['GET'])
# def get_image():
#     result = product_controller.static_category()
#     return send_file(filename, mimetype='image/gif')


