from flask import Blueprint, request, g
from controller.order_controller import *
from middleware.auth import login_required


mod = Blueprint('order', __name__, url_prefix='/order')


@mod.route('/', methods=['GET', 'POST'])
@login_required
def order_handle():
    if request.method == 'GET':
        id = request.args.get('id')
        order_state_id = request.args.get('order_state_id')
        if id:
            list_order = get_order(id)
        elif order_state_id:
            list_order = get_order_by_state(order_state_id)
        else:
            list_order = get_by_user(g.user.id)

        return {'data': list_order}, 200
        
    elif request.method == 'POST':
        data = request.json
        error_code, result = add(data)
        if result:
            return {'status': error_code, 'error': result}, 200
        else:
            return {'status': 0}, 200


@mod.route('/update-state', methods=['PUT'])
@login_required
def update_state():
    order_id = request.json.get('order_id')
    state = request.json.get('state')
    if update_status(order_id, state):
        return {'status': 1, 'error': 'can not update state'}, 200
    else:
        return {'status': 0}, 200
        
