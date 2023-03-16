from repository import order_repo, order_product_repo, user_repo, product_repo
from datetime import datetime
from flask import g


def get_detail(order):
    order_id = int(order['id'])
    user_id = int(order['user_id'])

    user = user_repo.find_by_id(user_id)
    order['first_name'] = user.first_name
    order['last_name'] = user.last_name
    order['data'] = []

    total = 0
    carts = order_product_repo.find_by_order_id(order_id)
    for cart in carts:
        product_id = cart.product_id
        product = product_repo.find_by_id(product_id)
        product_name = product.name
        total += product.promotion_price * int(cart.quantity)

        data = {}
        data['product_id'] = product_id
        data['product_name'] = product_name
        data['quantity'] = cart.quantity
        data['price'] = cart.price
        order['data'].append(data)
    order['total'] = total
    return order


def get_by_user(user_id):
    list_order = order_repo.find_by_user_id(user_id)
    list_order = list(map(lambda x: get_detail(x.to_full_json()), list_order))
    return list_order


def get_order(order_id):
    user_id = g.user.id
    order = order_repo.find_by_id_and_user_id(order_id, user_id).to_full_json()
    return get_detail(order)


def get_order_by_state(order_state_id):
    user_id = g.user.id
    list_order = order_repo.find_by_order_state_id_and_user_id(order_state_id, user_id)
    list_order = list(map(lambda x: get_detail(x.to_full_json()), list_order))
    return list_order


def get_all_order():
    return 


def add(data):
    try:
        user_id = g.user.id
        data['name'] = g.user.name
        data['phone'] = g.user.phone
        data['address'] = g.user.address
        data['email'] = g.user.email
        data['user_id'] = user_id
        data['order_state_id'] = 1
        order_id = order_repo.insert(data)
        detail = data.get('data')
        rs = order_product_repo.insert_all(detail, order_id)
        
        return True
    except:
        return False

    
def update_status(id, state):
    try:
        data = {'order_state_id': state}
        order_repo.update_by_id(id, data)
        return True
    except:
        return False


def delete(id):
    try:
        order_repo.delete_by_id(id)
        return True
    except:
        return False




# def find_by(data):
#     if data.get('state'):
#         list_order = order_repo.get_order_by_order_state_id(data['state'])
#         return list_order

