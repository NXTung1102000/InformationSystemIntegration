from models.order import Order, db
from datetime import datetime


def find_all():
    return Order.query.all()

def find_by_id(id):
    return Order.query.filter_by(id=id).first()

def find_by_id_and_user_id(id, user_id):
    return Order.query.filter_by(id=id, user_id=user_id).first()

def find_by_user_id(user_id):
    return Order.query.filter_by(user_id=user_id).order_by(Order.created_date.desc()).all()

# By phone
def find_by_phone(phone):
    return Order.query.filter_by(phone=phone).all()

# By email
def find_by_email(email):
    return Order.query.filter_by(email=email).all()

# By order_state_id
def find_by_order_state_id(order_state_id):
    return Order.query.filter_by(order_state_id=order_state_id).all()

def find_by_order_state_id_and_user_id(order_state_id, user_id):
    return Order.query.filter_by(order_state_id=order_state_id, user_id=user_id).all()

# By user_id (1: ascending, 2:descending)
def get_order_by_user_id(type=1):
    if type == 1:
        return Order.query.order_by(Order.user_id.asc())
    else:   
        return Order.query.order_by(Order.user_id.desc())
    
# By order_state_id (1: ascending, 2:descending)
def get_order_by_order_state_id(type=1):
    if type == 1:
        return Order.query.order_by(Order.order_state_id.asc())
    else:   
        return Order.query.order_by(Order.order_state_id.desc())


def insert(json_data):
    try:
        order = Order.from_json(json_data)
        db.session.add(order)
        db.session.commit()
        return order.id
    except:
        return False


def update_by_id(id, data):
    try:
        data['updated_state_date'] = datetime.now()
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