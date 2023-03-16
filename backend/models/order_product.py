from init_app import db


class OrderProducts(db.Model):
    __tablename__ = 'order_product'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    order_id = db.Column('order_id', db.Integer, nullable=False)
    product_id = db.Column('product_id', db.Integer, nullable=False)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    price = db.Column('price', db.Float, nullable=False)


    def __init__(self, **kwargs):
        super(OrderProducts, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'order_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'price': self.price,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        order_id = json_post.get('order_id')
        product_id = json_post.get('product_id')
        quantity = json_post.get('quantity')
        price = json_post.get('price')

        cart = OrderProducts(
            order_id = order_id,
            product_id = product_id,
            quantity = quantity,
            price = price,
        )
        return cart
