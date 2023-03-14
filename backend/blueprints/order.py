from flask import Blueprint, request, g
from controller.order_controller import *
from middleware.auth import login_required


mod = Blueprint('order', __name__, url_prefix='/order')


@mod.route('/', methods=['GET', 'POST'])
@login_required
def order_handle():
    if request.method == 'GET':
        id = request.args.get('id')
        if id:
            list_order = get_order(id)
        else:
            list_order = get_by_user(g.user.id)

        return {'data': list_order}, 200
        
    elif request.method == 'POST':
        data = request.json
        result = add(data)
        if result:
            return {'status': 0}, 200
        else:
            return {'status': 1, 'error': 'can not add'}, 400


@mod.route('/update-state', methods=['PUT'])
@login_required
def update_state():
    order_id = request.json.get('order_id')
    state = request.json.get('state')
    if update_status(order_id, state):
        return {'status': 0}, 200
    else:
        return {'status': 1, 'error': 'can not update status'}, 400
    

@mod.route('/filter', methods=['GET'])
@login_required
def filter():
    state = request.json.get('state')
    if state and state == 'asc':
        data = request.json
        sort_by(data)
        return {'status': 0}, 200
    else:
        return {'status': 1, 'error': 'can not sort'}, 400