from models.product_review import ProductReview, db
from sqlalchemy import func

# Get all accounts
def find_all():
    return ProductReview.query.all()
# Get accounts by filtering
# By id
def find_by_id(id):
    return ProductReview.query.filter_by(id=id).first()
# By user_id
def find_by_user_id(user_id):
    return ProductReview.query.filter_by(user_id=user_id).all()
# By product_id
def find_by_product_id(product_id):
    return ProductReview.query.filter_by(product_id=product_id).all()

# Get review of product in order
# By product_id and star (1: ascending, 2:descending)
def get_order_by_product_id_and_star(type, product_id):
    if type == 1:
        return ProductReview.query.filter_by(product_id=product_id).order_by(ProductReview.star.asc())
    else:   
        return ProductReview.query.filter_by(product_id=product_id).order_by(ProductReview.star.desc())

def insert(json_data):
    try:
        productReview = ProductReview.from_json(json_data)
        db.session.add(productReview)
        db.session.commit()
        return productReview
    except:
        return False

def update_by_id(id, data):
    try:
        productReview = ProductReview.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        productReview = find_by_id(id)
        db.session.delete(productReview)
        db.session.commit()
        return True
    except:
        return False
    




