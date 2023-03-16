from init_app import db
import json
from datetime import datetime


class ProductReview(db.Model):
    __tablename__ = 'product_review'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column('user_id', db.Integer, nullable=False)
    product_id = db.Column('product_id', db.Integer, nullable=False)
    star = db.Column('star', db.Integer, nullable=False)
    list_images = db.Column('list_images', db.Text)
    content = db.Column('content', db.Text, nullable=False)
    created_date = db.Column('created_date', db.DateTime, default=datetime.now(), nullable=False)
    updated_date = db.Column('updated_date', db.DateTime, nullable=True)


    def __init__(self, **kwargs):
        super(ProductReview, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'star': self.star,
            'list_images': self.list_images,
            'content': self.content,
            'created_date': self.created_date, 
            'updated_date': self.updated_date,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        user_id = json_post.get('user_id')
        product_id = json_post.get('product_id')
        star = json_post.get('star')
        list_images = json.dumps(json_post.get('list_images'))
        content = json_post.get('content')
        created_date = json_post.get('created_date')
        updated_date = json_post.get('updated_date')

        productReview_return = ProductReview(
            user_id=user_id,
            product_id=product_id,
            star=star,
            list_images=list_images,
            content=content,
            created_date=created_date,
            updated_date=updated_date,
        )
        return productReview_return
