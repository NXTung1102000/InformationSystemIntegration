from flask import Blueprint, request, g
from controller import comment_controller
from middleware.auth import login_required


mod = Blueprint('comment', __name__, url_prefix='/comment')


@mod.route('/', methods=['GET'])
def get_comment():
    id = request.args.get('id')
    if id:
        comment = comment_controller.get_by_id(id)
        return {'data': [comment]}
    
    product_id = request.args.get('product_id')
    if product_id:
        list_comment = comment_controller.get_comment_product(product_id)
    return {'data': list_comment}


@mod.route('/', methods=['POST', 'PUT', 'DELETE'])
@login_required
def comment_handle():
    if request.method == 'POST':
        user_id = g.user.id
        data = request.form
        # data['user_id'] = user_id
        result = comment_controller.add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 200

    elif request.method == 'PUT':
        data = request.form
        id = int(data.get('id'))
        result = comment_controller.update(id, data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not update'}, 200

    elif request.method == 'DELETE':
        id = request.args.get('id')
        result = comment_controller.delete(id)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not delete'}, 200

    return 