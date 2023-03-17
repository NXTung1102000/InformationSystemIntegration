from controller.category_controller import *
from flask import Blueprint, request, g


mod = Blueprint('category', __name__, url_prefix='/category')


@mod.route('/', methods=['GET'])
def calculate_revenue_category():
    # q = db.session.query(OrderProducts, Product).filter(OrderProducts.product_id == Product.id).all()
    rs = db.session.query(Product.product_category_id, func.sum(OrderProducts.price)).group_by(Product.product_category_id).all()
    return {'data': dict(rs)}, 200



def static():
    rs = db.session.query(func.count(User.id)).filter(User.is_activated == 1).all()
    print(rs)
    return

