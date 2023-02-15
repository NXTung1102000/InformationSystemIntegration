from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import SQLALCHEMY_DATABASE_URI, SECRET_KEY


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'max_overflow': 30,
    'pool_size': 100
}
app.secret_key = SECRET_KEY

# CORS(app, resources={r"/*": {"origins": "*", "send_wildcard": "False"}})

db = SQLAlchemy(app=app, session_options={'autocommit': False, 'autoflush': False})

migrate = Migrate(app, db)
db.init_app(app)
migrate.init_app(app, db)

