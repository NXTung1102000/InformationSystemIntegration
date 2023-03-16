from models.cart import Cart, db
from sqlalchemy import func


def find_all():
    return Cart.query.all()


def find_by_id(id):
    return Cart.query.filter_by(id=id).first()


def find_by_cart_id(cart_id):
    return Cart.query.filter_by(cart_id=cart_id).all()


def insert(json_data):
    try:
        try:
            cart_id = int(db.session.query(func.max(Cart.cart_id)).scalar()) + 1
        except:
            cart_id = 1

        for row in json_data:
            row['cart_id'] = cart_id
            cart = Cart.from_json(row)
            db.session.add(cart)
        db.session.commit()
        return cart_id
    except:
        return False


def update_by_id(id, data):
    try:
        cart = Cart.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        cart = find_by_id(id)
        db.session.delete(cart)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(cart_id):
    try:
        cart = find_by_cart_id(cart_id)
        db.session.delete(cart)
        db.session.commit()
        return True
    except:
        return False

