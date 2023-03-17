from flask import request, g
from repository.product_repo import *
from repository import product_category_repo , brand_repo


def get(id=None):
    if id is not None:
        product = find_by_id(id).to_full_json()
        product['category'] = product_category_repo.find_by_id(product['product_category_id']).to_full_json()['name']
        product['brand'] = brand_repo.find_by_id(product['brand_id']).to_full_json()['name']
        return [product]
    else:
        list_product = find_all()
        list_product = list(map(lambda x: x.to_full_json(), list_product))
        for product in list_product:
            product['category'] = product_category_repo.find_by_id(product['product_category_id']).to_full_json()['name']
            product['brand'] = brand_repo.find_by_id(product['brand_id']).to_full_json()['name']
        return list_product


def add(data):
    try:
        insert(data)
        return True
    except:
        return False

    
def update(id, data):
    try:
        update_by_id(id, data)
        return True
    except:
        return False


def delete(id):
    try:
        delete_by_id(id)
        return True
    except:
        return False

    
def search_product(kwargs):
    list_product = search(kwargs)
    list_product = list(map(lambda x: x.to_full_json(), list_product))
    return list_product if list_product else []


def static_category():
    list_count = count_product_by_category()
    return list_count