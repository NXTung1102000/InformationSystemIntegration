from flask import request, g
from controller.user_controller import *
from utils.encode import encode, get_random_string


def register_user(username, password, role=1):
    user = find_by_username(username)
    if user:
        return {'status': 1, 'error': 'exist username'}, 400
    password = encode(password)
    user_data = {'username': username, 'password': password, 'role': role}
    insert(user_data)
    
    return {'status': 0}


def login(username, password):
    password = encode(password)
    user = find_by_username_and_password(username, password)
    if not user:
        return {'status': 1, 'error': 'username or password is not correct'}, 400

    token = get_random_string()
    data = {'token': token}
    update_by_id(user.id, data)

    return {'status': 0, 'data': {'token': token}}


def logout():
    data = {'token': ''}
    update_by_id(g.user.id, data)
    return {'status': 0}


def change_password(username, password):
    user = find_by_username(username)
    if not user:
        return {'status': 1, 'error': 'not exist username'}, 400

    password = encode(password)
    data = {'password': password}
    update_by_id(user.id, data)
    return {'status': 0}

