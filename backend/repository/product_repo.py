from models.product import Product, db
from repository import product_category_repo
from datetime import datetime
from sqlalchemy import func


def find_all():
    return Product.query.all()


def find_by_id(id):
    return Product.query.filter_by(id=id).first()


def find_by_name(name):
    return Product.query.filter(Product.name.like(f'%{name}%')).all()

# Get accounts by filtering
# By category
def find_by_category(product_category_id):
    return Product.query.filter_by(product_category_id=product_category_id).all()

# By keywords (not check)
def find_by_keywords(keywords):
    for kw in keywords:
        clause = '%'+kw+'%'
        results = Product.query.filter(
            Product.meta_keywords.like(clause)).distinct().all()
    return results

# By price between (minPrice, maxPrice)
def find_by_price(minPrice=0, maxPrice=99999999999):
    return Product.query.filter(Product.price >= minPrice, Product.price <= maxPrice).all()

# Get products in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type=1):
    if type == 1:
        return Product.query.order_by(Product.name.asc())
    else:   
        return Product.query.order_by(Product.name.desc())
# By price (1: ascending, 2:descending)
def get_order_by_price(type=1):
    if type == 1:
        return Product.query.order_by(Product.price.asc())
    else:   
        return Product.query.order_by(Product.price.desc())
# By warranty (1: ascending, 2:descending)
def get_order_by_warranty(type=1):
    if type == 1:
        return Product.query.order_by(Product.warranty.asc())
    else:   
        return Product.query.order_by(Product.warranty.desc())
# By quantity and product_category
def get_order_by_quantity_and_category(type, product_category_id):
    if type == 1:
        return Product.query.filter(product_category_id=product_category_id).order_by(Product.warranty.asc())
    else:   
        return Product.query.filter(product_category_id=product_category_id).order_by(Product.warranty.desc())

def insert(json_data):
    try:
        product = Product.from_json(json_data)
        db.session.add(product)
        db.session.commit()
        return True
    except:
        return False
    
    

def update_data(product, data):
    data['updated_date'] = datetime.now()
    product.update(data)
    db.session.commit()


def update_by_id(id, data):
    try:
        # data['updated_date'] = datetime.now()
        process_data = {
            'quantity': data.get('quantity'),
            'name': data.get('name'),
            'brand': data.get('brand'),
            'category': data.get('category'),
            'description': data.get('description'),
            'detail': data.get('detail'),
            'price': data.get('price'),
            'quantity': data.get('quantity'),
            }
        product = Product.query.filter_by(id=id).update(process_data)
        db.session.commit()
        return True
    except:
        return False


def delete_by_id(id):
    try:
        data = {'is_activated': 0}
        product = Product.query.filter_by(id=id).update(data)
        db.session.commit()
        # product = find_by_id(id)
        # db.session.delete(product)
        # db.session.commit()
        return True
    except:
        return False


def count_product_by_category():
    # category = product_category_repo.find_all()
    data_count = db.session.query(Product.category, func.count(Product.category)).group_by(Product.category).all()
    return data_count


def search(kwargs):
    base = Product.query

    if kwargs.get('category'):
        category = kwargs['category']
        category = category.capitalize()
        base = base.filter(Product.category == category)
    if kwargs.get('keyword'):
        clause = '%'+kwargs['keyword']+'%'
        base = base.filter(Product.name.like(clause)).distinct()
    # if kwargs.get('from_date'):
    #     base = base.filter(Product.date == kwargs['category'])
    if kwargs.get('price_min'):
        base = base.filter(Product.promotion_price >= float(kwargs['price_min']))
    if kwargs.get('price_max'):
        base = base.filter(Product.promotion_price <= float(kwargs['price_max']))
    if kwargs.get('sort_by_price'):
        if kwargs.get('sort_by_price') == 'desc':
            base = base.order_by(Product.promotion_price.desc())
        elif kwargs.get('sort_by_price') == 'asc':
            base = base.order_by(Product.promotion_price.asc())

    if kwargs.get('date_asc'):
        base = base.order_by(Product.created_date.asc())
    else:
        base = base.order_by(Product.created_date.desc())

    if kwargs.get('all'):
        pass
    else:
        base = base.filter(Product.quantity > 0).filter(Product.is_activated == 1)

    return base.all()
