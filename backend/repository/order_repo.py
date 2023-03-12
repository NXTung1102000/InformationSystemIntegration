from models.order import Order, db

def find_all():
    return Order.query.all()

def find_by_id(id):
    return Order.query.filter_by(id=id).first()

def find_by_account_id(account_id):
    return Order.query.filter_by(account_id=account_id).all()
# By phone
def find_by_phone(phone):
    return Order.query.filter_by(phone=phone).all()
# By email
def find_by_email(email):
    return Order.query.filter_by(email=email).all()
# By order_state_id
def find_by_order_state(order_state):
    order_state = order_state.lower()
    if (order_state == "chờ duyệt đơn"):
        order_state_id = 1
    elif (order_state == "không duyệt đơn"):
        order_state_id = 2
    elif (order_state == "đã duyệt đơn"):
        order_state_id = 3
    elif (order_state == "đang chuẩn bị hàng"):
        order_state_id = 4
    elif (order_state == "đang vận chuyển"):
        order_state_id = 5
    elif (order_state == "đã giao và thanh toán"):
        order_state_id = 6
    elif (order_state == "khách hàng không nhận hàng"):
        order_state_id = 7
    else:
        order_state_id = 8
    return Order.query.filter_by(order_state_id=order_state_id).all()

# Get accounts in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type):
    if type == 1:
        return Order.query.order_by(Order.name.asc())
    else:   
        return Order.query.order_by(Order.name.desc())
# By account_id (1: ascending, 2:descending)
def get_order_by_account_id(type):
    if type == 1:
        return Order.query.order_by(Order.account_id.asc())
    else:   
        return Order.query.order_by(Order.account_id.desc())
# By order_state_id (1: ascending, 2:descending)
def get_order_by_order_state_id(type):
    if type == 1:
        return Order.query.order_by(Order.order_state_id.asc())
    else:   
        return Order.query.order_by(Order.order_state_id.desc())


def insert(json_data):
    try:
        order = Order.from_json(json_data)
        db.session.add(order)
        db.session.commit()
        return order
    except:
        return False

def update_by_id(id, data):
    try:
        order = Order.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
        

def delete_by_id(id):
    try:
        order = find_by_id(id)
        db.session.delete(order)
        db.session.commit()
        return True
    except:
        return False