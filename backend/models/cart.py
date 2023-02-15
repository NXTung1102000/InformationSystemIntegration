from init_app import db


class Cart(db.Model):
    __tablename__ = 'cart'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    cart_id = db.Column('cart_id', db.Integer, nullable=False)
    product_id = db.Column('product_id', db.Integer, nullable=False)
    quantity = db.Column('quantity', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(Cart, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        cart_id = json_post.get('cart_id')
        product_id = json_post.get('product_id')
        quantity = json_post.get('quantity')

        cart = Cart(
            cart_id = cart_id,
            product_id = product_id,
            quantity = quantity,
        )
        return cart
