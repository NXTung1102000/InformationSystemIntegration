from init_app import db
import json


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    description = db.Column('description', db.Text(), nullable=False)
    brand = db.Column('brand', db.VARCHAR(255))
    specification = db.Column('specification', db.VARCHAR(255), nullable=False)
    price = db.Column('price', db.Float, nullable=False)
    promotion_price = db.Column('promotion_price', db.Float, nullable=False)
    image = db.Column('image', db.VARCHAR(255), nullable=False)
    category = db.Column('category', db.VARCHAR(255), nullable=False)
    top_hot = db.Column('top_hot', db.VARCHAR(255))
    view_count = db.Column('view_count', db.Integer, nullable=False)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    review = db.Column('review', db.VARCHAR(255))


    def __init__(self, **kwargs):
        super(Product, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,

        }
        return json_token

    @staticmethod
    def from_json(json_post):
        user_id = json_post.get('user_id')
        descript = json.dumps(json_post.get('descript'))

        product_return = Product(
            user_id=user_id,

        )
        return product_return
