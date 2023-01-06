from models.product import Product


def find_by_id(id):
    product = Product.query.filter_by(id=id).first()
    return product


def find_by_name(name):
    return 


def insert(json_data):
    return


def delete_by_id(id):
    return 