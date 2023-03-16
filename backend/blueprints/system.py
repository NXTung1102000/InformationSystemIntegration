from flask import Blueprint
from controller.user_controller import *
from controller import system_controller
from middleware.auth import login_required


mod = Blueprint('auth', __name__)


@mod.route('/register', methods=['POST'])
def register():
    data = request.json
    return system_controller.register_user(data)


@mod.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    return system_controller.login(username, password)


@mod.route('/logout', methods=['POST'])
@login_required
def logout():
    return system_controller.logout()


@mod.route('/change-password', methods=['POST'])
def change_password():
    username = request.json.get('username')
    new_password = request.json.get('new_password')
    return system_controller.change_password(username, new_password)
