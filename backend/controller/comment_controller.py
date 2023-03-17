from flask import request, g
from repository.product_review_repo import *


def get_by_id(id=None):
    comment = find_by_id(id).to_full_json()
    return comment
    

def get_comment_product(product_id):
    comments = find_by_product_id(product_id)
    comments = list(map(lambda x: x.to_full_json(), comments))
    return comments


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

