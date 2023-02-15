from models.product import Product, db
from sqlalchemy import func


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


def find_all_category():
    return Product.query.with_entities(Product.category).distinct().all


def count_product_by_category():
    return db.session.query(Product.category, func.count(Product.category)).group_by(Product.category).all()


def search(kwargs):
    base = Product.query
    if kwargs.get('category'):
        base = base.filter(Product.category == kwargs['category'])
    # if kwargs.get('from_date'):
    #     base = base.filter(Product.date == kwargs['category'])
    if kwargs.get('star'):
        base = base.filter(Product.star >= float(kwargs['star']))
    if kwargs.get('price_min'):
        base = base.filter(Product.price >= float(kwargs['price']))
    if kwargs.get('price_max'):
        base = base.filter(Product.price <= float(kwargs['price']))
    if kwargs.get('sort_by_price'):
        if kwargs.get('sort_by_price') == 'desc':
            base = base.order_by(Product.price.desc())
        elif kwargs.get('sort_by_price') == 'asc':
            base = base.order_by(Product.price.asc())

    return base.all()

