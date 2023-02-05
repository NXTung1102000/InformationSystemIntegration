from models.product import Product, db


def find_all():
    return Product.query.all()


def find_by_id(id):
    return Product.query.filter_by(id=id).first()


def find_by_name(name):
    return Product.query.filter(Product.name.like(f'%{name}%')).all()


def insert(json_data):
    try:
        product = Product.from_json(json_data)
        db.session.add(product)
        db.session.commit()
        return True
    except:
        return False


def update_by_id(id, data):
    try:
        product = Product.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    


def delete_by_id(id):
    try:
        product = find_by_id(id)
        db.session.delete(product)
        db.session.commit()
        return True
    except:
        return False


def sort_by_name():
    return


def sort_by_price(list, order='desc'):
    if order == 'desc':
        list.order_by(Product.price.desc())
    elif order == 'asc':
        list.order_by(Product.price.desc())
    else:
        return []

    return list