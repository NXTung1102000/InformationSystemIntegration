from flask import Blueprint, request
from controller.product_controller import *


mod = Blueprint('product', __name__, url_prefix='/product')


@mod.route('/<id>', methods=['GET', 'POST'])
def page(id):
    if request.method == 'POST':
        data = request.form["post_id"]
    elif request.method == 'GET':
        return{}, 200

    return 