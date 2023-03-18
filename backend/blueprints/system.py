from flask import Blueprint
from controller.user_controller import *
from controller import system_controller
from middleware.auth import login_required
from init_app import app
from flask import send_from_directory


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
@login_required
def change_password():
    old_password = request.json.get('old_password')
    new_password = request.json.get('new_password')
    return system_controller.change_password(old_password, new_password)


@mod.route('/create_account', methods=['POST'])
def create_account():
    data = request.json
    data['role'] = 2
    return system_controller.register_user(data)


@app.route('/show')
def uploaded_file():
    filename = request.args.get('filename')
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)