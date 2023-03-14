from repository import order_repo, cart_repo, user_repo, product_repo
from datetime import datetime
from flask import g


def get_detail(order):
    cart_id = int(order['cart_id'])
    user_id = int(order['user_id'])

    user = user_repo.find_by_id(user_id)
    order['first_name'] = user.first_name
    order['last_name'] = user.last_name
    order['data'] = []

    total = 0
    carts = cart_repo.find_by_cart_id(cart_id)
    for cart in carts:
        product_id = cart.product_id
        product = product_repo.find_by_id(product_id)
        product_name = product.name
        total += product.promotion_price * int(cart.quantity)

        data = {}
        data['product_id'] = product_id
        data['product_name'] = product_name
        data['quantity'] = cart.quantity
        order['data'].append(data)
    order['total'] = total
    return order


def get_by_user(user_id):
    list_order = order_repo.find_by_user_id(user_id)
    list_order = list(map(lambda x: get_detail(x.to_full_json()), list_order))
    return list_order


def get_order(order_id):
    order = order_repo.find_by_id(order_id).to_full_json()
    return get_detail(order)


def add(data):
    try:
        user_id = g.user.id
        detail = data.get('data')

        cart_id = cart_repo.insert(detail)
        current_dateTime = datetime.now()
        status = 'delivering'
        order_data = {'user_id': user_id, 'cart_id': cart_id, 'status': status}
        order = order_repo.insert(order_data)

        return True
    except:
        return False

    
def update_status(id, status):
    try:
        data = {'status': status}
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


def sort_by(data):
    if data.get('state'):
        list_order = order_repo.get_order_by_order_state_id(data['state'])
        print(list_order)
        return list_order
    
