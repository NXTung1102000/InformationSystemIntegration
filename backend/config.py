# database
from urllib.parse import quote
config_dict = {
    'HOST': 'localhost',
    'PORT': 3306,
    'DATABASE_NAME': 'ecomerce',
    'DATABASE_USER': 'root',
    'DATABASE_PASSWORD': quote('root')
}

# SQLALCHEMY_DATABASE_URI = 'mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{HOST}:{PORT}/{DATABASE_NAME}'.format(**config_dict)
SQLALCHEMY_DATABASE_URI = 'mariadb+mariadbconnector://admin:admin123@127.0.0.1:3306/database'.format(**config_dict)

## App
APP_PORT = 5000
DATA_PATH = '/home/xuantung/HUST/DoAnHTTT/database/Dataset1/'

SECRET_KEY = 'xyz'