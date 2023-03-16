from models.order import Order
from models.order_product import OrderProducts, db
from sqlalchemy import func


def find_all():
    return OrderProducts.query.all()


def find_by_id(id):
    return OrderProducts.query.filter_by(id=id).first()


def find_by_order_id(order_id):
    return OrderProducts.query.filter_by(order_id=order_id).all()


def insert_all(json_data, order_id):
    try:
        for row in json_data:
            row['order_id'] = order_id
            orderProducts = OrderProducts.from_json(row)
            db.session.add(orderProducts)
        db.session.commit()
        return order_id
    except:
        return False


def update_by_id(id, data):
    try:
        orderProducts = OrderProducts.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        orderProducts = find_by_id(id)
        db.session.delete(orderProducts)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_order_id(order_id):
    try:
        orderProducts = find_by_order_id(order_id)
        db.session.delete(orderProducts)
        db.session.commit()
        return True
    except:
        return False

