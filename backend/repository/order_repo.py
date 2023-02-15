from models.order import Order, db


def find_all():
    return Order.query.all()


def find_by_id(id):
    return Order.query.filter_by(id=id).first()


def find_by_user_id(user_id):
    return Order.query.filter_by(user_id=user_id).all()


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

