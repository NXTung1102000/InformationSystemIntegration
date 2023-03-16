from models.product import Product, db
from sqlalchemy import func


def find_all():
    return Product.query.all()


def find_by_id(id):
    return Product.query.filter_by(id=id).first()


def find_by_name(name):
    return Product.query.filter(Product.name.like(f'%{name}%')).all()

# Get accounts by filtering
# By category
def find_by_category(product_category):
    product_category = product_category.lower()
    if (product_category == "laptop") | (product_category == "máy tính xách tay"):
        product_category_id = 1
    elif (product_category == "mobile") | (product_category == "điện thoại"):
        product_category_id = 2
    elif (product_category == "mouse") | (product_category == "chuột"):
        product_category_id = 3
    elif (product_category == "keyboard") | (product_category == "bàn phím"):
        product_category_id = 4
    elif (product_category == "gear") | (product_category == "thiết bị, phụ kiện máy tính"):
        product_category_id = 5
    elif (product_category == "pc gaming") | (product_category == "máy tính gaming"):
        product_category_id = 6
    elif (product_category == "monitor") | (product_category == "màn hình"):
        product_category_id = 7
    else:
        product_category_id = 8
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
def get_order_by_name(type):
    if type == 1:
        return Product.query.order_by(Product.name.asc())
    else:   
        return Product.query.order_by(Product.name.desc())
# By price (1: ascending, 2:descending)
def get_order_by_score(type):
    if type == 1:
        return Product.query.order_by(Product.price.asc())
    else:   
        return Product.query.order_by(Product.price.desc())
# By warranty (1: ascending, 2:descending)
def get_order_by_warranty(type):
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


# def sort_by_name():
#     return

#Khong con truong category nua
# def find_all_category():
#     return Product.query.with_entities(Product.category).distinct().all

# def count_product_by_category():
#     return db.session.query(Product.category, func.count(Product.category)).group_by(Product.category).all()

def search(kwargs):
    base = Product.query
    if kwargs.get('product_category_id'):
        base = base.filter(Product.product_category_id == kwargs['product_category_id'])
    # if kwargs.get('from_date'):
    #     base = base.filter(Product.date == kwargs['category'])
    # if kwargs.get('star'):
    #     base = base.filter(Product.star >= float(kwargs['star']))
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
