# database
from urllib.parse import quote
config_dict = {
    'HOST': 'localhost',
    'PORT': 3306,
    'DATABASE_NAME': 'ecomerce',
    'DATABASE_USER': 'root',
    'DATABASE_PASSWORD': quote('root')
}

SQLALCHEMY_DATABASE_URI = 'mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{HOST}:{PORT}/{DATABASE_NAME}'.format(**config_dict)

## App
APP_PORT = 5001

SECRET_KEY = 'xyz'