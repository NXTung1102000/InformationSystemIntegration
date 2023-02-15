from init_app import db
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column('user_id', db.Integer, nullable=False)
    cart_id = db.Column('cart_id', db.Integer, nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.now())
    status = db.Column('status', db.VARCHAR(20), nullable=False)


    def __init__(self, **kwargs):
        super(Order, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'user_id': self.user_id,
            'cart_id': self.cart_id,
            'created_at': self.created_at,
            'status': self.status,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        user_id = json_post.get('user_id')
        cart_id = json_post.get('cart_id')
        created_at = json_post.get('created_at')
        status = json_post.get('status')


        order = Order(
            user_id = user_id,
            cart_id = cart_id,
            # created_at = created_at,
            status = status,
        )
        return order
