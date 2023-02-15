from init_app import db
import json


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(255), unique=True, nullable=False)
    description = db.Column('description', db.VARCHAR(255))
    specification = db.Column('specification', db.Text)
    brand = db.Column('brand', db.VARCHAR(255), nullable=False)
    price = db.Column('price', db.Float, nullable=False)
    promotion_price = db.Column('promotion_price', db.Float)
    image = db.Column('image', db.VARCHAR(255))
    category = db.Column('category', db.VARCHAR(255), nullable=False)
    top_hot = db.Column('top_hot', db.VARCHAR(255))
    view_count = db.Column('view_count', db.Integer)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    review = db.Column('review', db.VARCHAR(255))


    def __init__(self, **kwargs):
        super(Product, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'brand': self.brand,
            'specification': self.specification,
            'price': self.price,
            'promotion_price': self.promotion_price,
            'image': self.image,
            'category': self.category,
            'top_hot': self.top_hot,
            'view_count': self.view_count,
            'quantity': self.quantity,
            'review': self.review,

        }
        return json_token

    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        specification = json.dumps(json_post.get('specification'))
        brand = json_post.get('brand')
        description = json_post.get('description')
        price = json_post.get('price')
        promotion_price = json_post.get('promotion_price')
        image = json_post.get('image')
        category = json_post.get('category')
        top_hot = json_post.get('top_hot')
        view_count = json_post.get('view_count')
        quantity = json_post.get('quantity')
        review = json_post.get('review')

        product_return = Product(
            name = name,
            description = description,
            brand = brand,
            specification = specification,
            price = price,
            promotion_price = promotion_price,
            image = image,
            category = category,
            top_hot = top_hot,
            view_count = view_count,
            quantity = quantity,
            review = review,
        )
        return product_return
