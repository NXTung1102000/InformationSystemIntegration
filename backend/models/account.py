from init_app import db
from datetime import datetime


class Account(db.Model):
    __tablename__ = 'account'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    username = db.Column('username', db.VARCHAR(255),
                         unique=True, nullable=False)
    password = db.Column('password', db.Text, nullable=False)
    accounttype_id = db.Column(
        'accounttype_id', db.Enum(1, 2, 3), nullable=False)
    name = db.Column('name', db.VARCHAR(255))
    email = db.Column('email', db.VARCHAR(255))
    address = db.Column('address', db.VARCHAR(400))
    phone = db.Column('phone', db.VARCHAR(255))
    created_date = db.Column('created_date', db.DateTime,
                             default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.VARCHAR(20), nullable=True)
    created_by = db.Column('created_by', db.Integer, nullable=False)
    updated_date = db.Column('updated_date', db.DateTime, nullable=True)
    score = db.Column('score', db.Integer, nullable=False)
    is_activated = db.column('is_activated', db.Enum(0, 1), nullable=False)

    def __init__(self, **kwargs):
        super(Account, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'accounttype_id': self.accounttype_id,
            'name': self.name,
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
        # print(json_post)
        username = json_post.get('username')
        password = json_post.get('password')
        accounttype_id = json_post.get('accounttype_id')
        name = json_post.get('name')
        address = json_post.get('address')
        phone = json_post.get('phone')
        email = json_post.get('email')
        created_by = json_post.get('created_by')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_date = json_post.get('updated_date')
        score = json_post.get('score')
        is_activated = json_post.get('is_activated')

        account_return = Account(
            username=username,
            password=password,
            accounttype_id=accounttype_id,
            name=name,
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
        return account_return
