from flask import Blueprint, request, g
from controller import voucher_controller
from middleware.auth import login_required


mod = Blueprint('voucher', __name__, url_prefix='/voucher')


@mod.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def voucher_handle():
    if request.method == 'GET':
        id = 1
        list_voucher = voucher_controller.get_by_id(id)
        return {'data': list_voucher}
    
    elif request.method == 'POST':
        user_id = g.user.id
        data = request.form
        data['user_id'] = user_id
        result = voucher_controller.add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 200

    elif request.method == 'PUT':
        data = request.json
        id = 1
        result = voucher_controller.update(id, data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not update'}, 200

    elif request.method == 'DELETE':
        id = request.args.get('id')
        result = voucher_controller.delete(id)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not delete'}, 200

    return 