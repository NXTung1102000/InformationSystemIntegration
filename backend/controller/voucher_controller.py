from flask import request, g
from repository.voucher_repo import *


def get(id=None):
    if id is not None:
        voucher = find_by_id(id).to_full_json()
        return [voucher]
    else:
        list_voucher = find_all()
        list_voucher = list(map(lambda x: x.to_full_json(), list_voucher))
        return list_voucher

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

