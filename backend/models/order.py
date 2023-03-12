from init_app import db
import json
from datetime import datetime


class Order(db.Model):
    # Bo sung them mot so truong
    __tablename__ = 'order'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    account_id = db.Column('account_id', db.Integer, nullable=False)
    # cart_id = db.Column('cart_id', db.Integer, nullable=False)

    name = db.Column('name', db.VARCHAR(100), nullable=False)
    phone = db.Column('phone', db.VARCHAR(15), nullable=False)
    address = db.Column('address', db.VARCHAR(120), nullable=False)
    email = db.Column('email', db.VARCHAR(255), nullable=False)
    order_state_id = db.Column('order_state_id', db.Enum(
        1, 2, 3, 4, 5, 6,  7, 8), nullable=False)
    # order_state_id = db.Column('order_state_id', db.Integer, nullable=False)
    note = db.Column('note', db.VARCHAR(500), nullable=True)
    created_date = db.Column('created_date', db.DateTime,
                             default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.VARCHAR(20), nullable=True)
    updated_state_by = db.Column(
        'updated_state_by', db.Integer, nullable=False)
    updated_state_date = db.Column(
        'updated_state_date', db.DateTime, nullable=False)

    # status = db.Column('status', db.VARCHAR(20), nullable=False)

    def __init__(self, **kwargs):
        super(Order, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'account_id': self.account_id,
            # 'cart_id': self.cart_id,

            'name': self.name,
            'phone': self.phone,
            'address': self.address,
            'email': self.email,
            'order_state_id': self.order_state_id,
            'note': self.note,
            'created_date': self.created_date,
            'updated_by': self.updated_by,
            'updated_state_by': self.updated_state_by,
            'updated_state_date': self.updated_state_date,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        account_id = json_post.get('account_id')
        # cart_id = json_post.get('cart_id')
        name = json_post.get('name')
        phone = json_post.get('phone')
        address = json_post.get('address')
        email = json_post.get('email')
        order_state_id = json_post.get('order_state_id')
        note = json_post.get('note')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_state_by = json_post.get('updated_state_by')
        updated_state_date = json_post.get('updated_state_date')

        order = Order(
            account_id=account_id,
            # cart_id = cart_id,
            name=name,
            phone=phone,
            address=address,
            email=email,
            order_state_id=order_state_id,
            note=note,
            created_date=created_date,
            updated_by=updated_by,
            updated_state_by=updated_state_by,
            updated_state_date=updated_state_date,
        )
        return order
