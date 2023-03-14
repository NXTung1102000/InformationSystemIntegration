from init_app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    username = db.Column('username', db.VARCHAR(255), unique=True, nullable=False)
    password = db.Column('password', db.Text, nullable=False)
    token = db.Column('token', db.VARCHAR(255))
    role = db.Column('role', db.Integer, nullable=False)
    name = db.Column('name', db.VARCHAR(255))
    first_name = db.Column('first_name', db.VARCHAR(255))
    last_name = db.Column('last_name', db.VARCHAR(255))
    email = db.Column('email', db.VARCHAR(255))
    address = db.Column('address', db.VARCHAR(400))
    phone = db.Column('phone', db.VARCHAR(255))
    created_date = db.Column('created_date', db.DateTime, default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.VARCHAR(20))
    created_by = db.Column('created_by', db.Integer, nullable=False)
    updated_date = db.Column('updated_date', db.DateTime)
    score = db.Column('score', db.Integer)
    is_activated = db.Column('is_activated', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'token': self.token,
            'role': self.role,
            'name': self.name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
            'phone': self.phone,
            'email': self.email,
            'created_by': self.created_by,
            'created_date': self.created_date,
            'updated_by': self.updated_by,
            'updated_date': self.updated_date,
            'score': self.score,
            'is_activated': self.is_activated,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        username = json_post.get('username')
        password = json_post.get('password')
        token = json_post.get('token')
        role = json_post.get('role')
        name = json_post.get('name')
        first_name = json_post.get('first_name')
        last_name = json_post.get('last_name')
        address = json_post.get('address')
        phone = json_post.get('phone')
        email = json_post.get('email')
        created_by = json_post.get('created_by')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_date = json_post.get('updated_date')
        score = json_post.get('score')
        is_activated = json_post.get('is_activated')

        User_return = User(
            username=username,
            password=password,
            token=token,
            role=role,
            name=name,
            first_name=first_name,
            last_name=last_name,
            address=address,
            phone=phone,
            email=email,
            created_by=created_by,
            created_date=created_date,
            updated_by=updated_by,
            updated_date=updated_date,
            score=score,
            is_activated=is_activated,
        )
        return User_return
