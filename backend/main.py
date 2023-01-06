from flask import request, jsonify
from config import *
from init_app import app
from middleware.auth import login_required



from blueprints import auth, product

app.register_blueprint(product.mod)


@app.route('/login', methods=['POST'])
def login():
    return auth.login()


@app.route('/logout', methods=['GET'])
@login_required
def logout():
    return auth.logout()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=APP_PORT)