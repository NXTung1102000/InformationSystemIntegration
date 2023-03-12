from init_app import db
import json


class OrderProduction(db.Model):
    __tablename__ = 'orderProduction'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    product_id = db.Column('product_id', db.Integer, nullable=False)
    order_id = db.Column('order_id', db.Integer, nullable=False)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    price = db.Column('price', db.Float, nullable=False)

    def __init__(self, **kwargs):
        super(OrderProduction, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'product_id': self.product_id,
            'order_id': self.order_id,
            'quantity': self.quantity,
            'price': self.price,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        # print(json_post)
        product_id = json_post.get('product_id')
        order_id = json_post.get('order_id')
        quantity = json_post.get('quantity')
        price = json_post.get('price')

        orderProduction_return = OrderProduction(
            product_id=product_id,
            order_id=order_id,
            quantity=quantity,
            price=price,
        )
        return orderProduction_return
