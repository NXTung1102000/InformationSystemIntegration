from models.order import Order
from repository import product_repo
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
            order_products = OrderProducts.from_json(row)
            db.session.add(order_products)

            product = product_repo.find_by_id(row['product_id'])
            data = {"quantity": product.quantity - row['quantity']}
            product_repo.update_by_id(product.id, data)

            db.session.commit()
        return order_id
    except:
        return False


def update_by_id(id, data):
    try:
        order_products = OrderProducts.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        order_products = find_by_id(id)
        db.session.delete(order_products)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_order_id(order_id):
    try:
        order_products = find_by_order_id(order_id)
        db.session.delete(order_products)
        db.session.commit()
        return True
    except:
        return False

