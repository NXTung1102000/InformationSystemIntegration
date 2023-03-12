from models.productCategory import ProductCategory, db
from sqlalchemy import func

# Get all accounts
def find_all():
    return ProductCategory.query.all()
# Get accounts by filtering
# By id
def find_by_id(id):
    return ProductCategory.query.filter_by(id=id).first()

def insert(json_data):
    try:
        productCategory = ProductCategory.from_json(json_data)
        db.session.add(productCategory)
        db.session.commit()
        return productCategory
    except:
        return False

def update_by_id(id, data):
    try:
        productCategory = ProductCategory.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        productCategory = find_by_id(id)
        db.session.delete(productCategory)
        db.session.commit()
        return True
    except:
        return False