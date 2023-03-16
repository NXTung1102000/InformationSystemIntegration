from models.orderProduction import OrderProduction, db
from sqlalchemy import func

# Get all accounts
def find_all():
    return OrderProduction.query.all()
# Get accounts by filtering
# By id
def find_by_id(id):
    return OrderProduction.query.filter_by(id=id).first()
#By product_id
def find_by_product_id(product_id):
    return OrderProduction.query.filter_by(product_id=product_id).all()
#By order_id
def find_by_order_id(order_id):
    return OrderProduction.query.filter_by(order_id=order_id).all()

# Get order production in order
# By name (1: ascending, 2:descending)
def get_order_by_order_id(type):
    if type == 1:
        return OrderProduction.query.order_by(OrderProduction.order_id.asc())
    else:   
        return OrderProduction.query.order_by(OrderProduction.order_id.desc())

def insert(json_data):
    try:
        try:
            order_id = int(db.session.query(func.max(OrderProduction.order_id)).scalar()) + 1
        except:
            order_id = 1

        for row in json_data:
            row['order_id'] = order_id
            orderProduction = OrderProduction.from_json(row)
            db.session.add(OrderProduction)
        db.session.commit()
        return order_id
    except:
        return False

def update_by_id(id, data):
    try:
        orderProduction = OrderProduction.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        orderProduction = find_by_id(id)
        db.session.delete(orderProduction)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_order_id(order_id):
    try:
        orderProduction = find_by_order_id(order_id)
        db.session.delete(orderProduction)
        db.session.commit()
        return True
    except:
        return False