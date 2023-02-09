from flask import request, g
from repository.user_repo import *


def get(id=None):
    if id is not None:
        user = find_by_id(id).to_full_json()
        return [user]
    else:
        users = find_all()
        users = list(map(lambda x: x.to_full_json(), users))
        return users


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

