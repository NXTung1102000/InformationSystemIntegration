from flask import request, jsonify
from config import *
from init_app import app
from blueprints import product, system, order, user, voucher


app.register_blueprint(product.mod)
app.register_blueprint(system.mod)
app.register_blueprint(order.mod)
app.register_blueprint(user.mod)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=APP_PORT, debug=True, use_reloader=False)