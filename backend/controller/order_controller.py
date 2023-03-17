from repository import order_repo, order_product_repo, user_repo, product_repo, order_state_repo
from flask import g


def get_detail(order):
    order_id = int(order['id'])
    user_id = int(order['user_id'])

    user = user_repo.find_by_id(user_id)
    order['first_name'] = user.first_name
    order['last_name'] = user.last_name
    order['data'] = []
    order['state'] = order_state_repo.find_by_id(order['order_state_id']).to_full_json()['name']

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
    # user_id = g.user.id
    list_order = order_repo.find_by_order_state_id(order_state_id)
    list_order = list(map(lambda x: get_detail(x.to_full_json()), list_order))
    return list_order


def get_all_order():
    return 


def add(data):
    try:
        user_id = g.user.id
        if g.user.score < 75:
            return 2, "score user too low"

        data['name'] = g.user.name
        data['phone'] = g.user.phone
        data['address'] = g.user.address
        data['email'] = g.user.email
        data['user_id'] = user_id
        data['order_state_id'] = 1
        detail = data.get('data')

        #check quantity
        for row in detail:
            quantity_product = product_repo.find_by_id(row['product_id']).to_full_json()['quantity']
            if row['quantity'] > quantity_product:
                return 3, 'error quantity'

        order_id = order_repo.insert(data)
    
        rs = order_product_repo.insert_all(detail, order_id)
        if not rs:
            return 4, 'error insert detail'  
        
        return 0, ''
    except:
        return 1, 'error'

    
def update_status(id, state):
    try:
        # if state == 1:
        #     order_product = order_product_repo.find_by_order_id(id)
        #     list_product = []
        #     order_data = []

        #     for row in order_product:
        #         data = row.to_full_json()
        #         order_data.append(row)

        #         # check all product
        #         product = product_repo.find_by_id(data['product_id'])
        #         product_json = product.to_full_json()
        #         list_product.append(product)

        #         if data['quantity'] > product_json['quantity']:
        #             return 'error quantity'
                
        #     for i, product in enumerate(list_product):
        #         new_data = {'quantity': product_json['quantity'] - order_data[i]['quantity']}
        #         product_repo.update_data(product, new_data)

        # if state == 3 or state == 4 or state == 5:
        #     order_product = order_product_repo.find_by_order_id(id)
        #     list_product = []
        #     order_data = []

        #     for row in order_product:
        #         data = row.to_full_json()
        #         order_data.append(row)

        #         # check all product
        #         product = product_repo.find_by_id(data['product_id'])
        #         product_json = product.to_full_json()
        #         list_product.append(product)
                
        #     for i, product in enumerate(list_product):
        #         new_data = {'quantity': product_json['quantity'] + order_data[i]['quantity']}
        #         product_repo.update_data(product, new_data)

        data = {'order_state_id': state}
        rs = order_repo.update_by_id(id, data)
        return ''
    except:
        return 'error'


def delete(id):
    try:
        order_repo.delete_by_id(id)
        return True
    except:
        return False


def check_product_quantity(detail):
    list_product = []
    for row in detail:
        product = product_repo.find_by_id(row['product_id'])
        product_json = product.to_full_json()
        list_product.append(product_json)

        if row['quantity'] > product_json['quantity']:
            return False, list_product
    
    return True, list_product



