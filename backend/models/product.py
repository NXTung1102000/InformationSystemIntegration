from init_app import db
import json
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(255), nullable=False)
    description = db.Column('description', db.VARCHAR(255))
    detail = db.Column('detail', db.VARCHAR(255))
    specification = db.Column('specification', db.Text)
    price = db.Column('price', db.Float, nullable=False)
    promotion_price = db.Column('promotion_price', db.Float)
    image = db.Column('image', db.VARCHAR(255))
    list_images = db.Column('list_images', db.Text)
    product_category_id = db.Column('product_category_id', db.Integer, nullable=False)
    created_date = db.Column('created_date', db.DateTime, default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.VARCHAR(20))
    created_by = db.Column('created_by', db.Integer, nullable=False)
    updated_date = db.Column('updated_date', db.DateTime)
    meta_keywords = db.Column('meta_keywords', db.VARCHAR(100))
    meta_descriptions = db.Column('meta_descriptions', db.Text)
    meta_title = db.Column('meta_title', db.VARCHAR(100))
    warranty = db.Column('warranty', db.Integer)
    is_included_vat = db.Column('is_included_vat', db.Integer, nullable=False)
    brand_id = db.Column('brand_id', db.Integer)
    view_count = db.Column('view_count', db.Integer)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    is_activated = db.Column('is_activated', db.Integer, nullable=False)
    endpoint = db.Column('endpoint', db.VARCHAR(100))


    def __init__(self, **kwargs):
        super(Product, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'detail': self.detail,
            'specification': self.specification,
            'price': self.price,
            'promotion_price': self.promotion_price,
            'image': self.image,
            'list_images': self.list_images,
            'product_category_id': self.product_category_id,
            'created_by': self.created_by,
            'created_date': self.created_date, 
            'updated_by': self.updated_by,
            'updated_date': self.updated_date,
            'meta_keywords': self.meta_keywords,
            'meta_descriptions': self.meta_descriptions,
            'meta_title': self.meta_title,
            'warranty': self.warranty,
            'is_included_vat': self.is_included_vat,
            'brand_id': self.brand_id,
            'view_count': self.view_count,
            'quantity': self.quantity,
            'is_activated': self.is_activated,
            'endpoint': self.endpoint,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        description = json_post.get('description')
        detail = json_post.get('detail')
        specification = json.dumps(json_post.get('specification'))
        price = json_post.get('price')
        promotion_price = json_post.get('promotion_price')
        image = json_post.get('image')
        list_images = json.dumps(json_post.get('list_images'))
        product_category_id = json_post.get('product_category_id')
        created_by = json_post.get('created_by')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_date = json_post.get('updated_date')
        meta_keywords = json_post.get('meta_keywords')
        meta_descriptions = json_post.get('meta_descriptions')
        meta_title = json_post.get('meta_title')
        warranty = json_post.get('warranty')
        is_included_vat = json_post.get('is_included_vat')
        brand_id = json_post.get('brand_id')
        view_count = json_post.get('view_count')
        quantity = json_post.get('quantity')
        is_activated = json_post.get('is_activated')
        endpoint = json_post.get('endpoint')

        product_return = Product(
            name=name,
            description=description,
            detail=detail,
            specification=specification,
            price=price,
            promotion_price=promotion_price,
            image=image,
            list_images=list_images,
            product_category_id=product_category_id,
            created_by=created_by,
            created_date=created_date,
            updated_by=updated_by,
            updated_date=updated_date,
            meta_keywords=meta_keywords,
            meta_descriptions=meta_descriptions,
            meta_title=meta_title,
            warranty=warranty,
            is_included_vat=is_included_vat,
            brand_id=brand_id,
            view_count=view_count,
            quantity=quantity,
            is_activated=is_activated,
            endpoint=endpoint,
        )
        return product_return


