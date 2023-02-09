from flask import request, jsonify
from config import *
from init_app import app
from middleware.auth import login_required
from blueprints import product, system


app.register_blueprint(product.mod)
app.register_blueprint(system.mod)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=APP_PORT, debug=True, use_reloader=False)