from flask import request, g
from controller.user_controller import *
from utils.encode import encode, get_random_string


def register_user(user_data):
    username = user_data.get('username')
    password = user_data.get('password')

    user = find_by_username(username)
    if user:
        return {'status': 1, 'error': 'exist username'}, 200
    password = encode(password)
    user_data['password'] = password

    user_data['is_activated'] = 1
    user_data['created_by'] = 1
    if user_data.get('role') is None:
        user_data['role'] = 3
    insert(user_data)
    
    return {'status': 0}


def login(username, password):
    password = encode(password)
    user = find_by_username_and_password(username, password)
    if not user:
        return {'status': 1, 'error': 'username or password is not correct'}, 200

    token = get_random_string()
    data = {'token': token}
    update_by_id(user.id, data)

    return {'status': 0, 'data': {'token': token, 
                                  'email': user.email, 
                                  'address': user.address, 
                                  'role': user.role, 
                                  'first_name': user.first_name,
                                  'last_name': user.last_name,
                                  }}


def logout():
    data = {'token': ''}
    update_by_id(g.user.id, data)
    return {'status': 0}


def change_password(old_password, new_password):
    user_id = g.user.id

    old_password = encode(old_password)
    if old_password != g.user.password:
        return {'status': 1, 'error': 'wrong old password'}
    
    new_password = encode(new_password)
    data = {'password': new_password}
    update_by_id(user_id, data)
    return {'status': 0}

