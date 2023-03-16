from init_app import db
import json
from datetime import datetime

class ProductCategory(db.Model):
    __tablename__ = 'productCategory'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(255), unique=True, nullable=False)
    detail = db.Column('detail', db.VARCHAR(255))
    parent_id = db.Column('parent_id', db.VARCHAR(255))
    endpoint = db.Column('endpoint', db.VARCHAR(100), nullable=False)
    created_by = db.Column('created_by', db.Integer, nullable=False)
    created_date = db.Column('created_date', db.DateTime,
                             default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.VARCHAR(20), nullable=True)
    updated_date = db.Column('updated_date', db.DateTime, nullable=True)
    meta_keywords = db.Column('meta_keywords', db.VARCHAR(200), nullable=False)
    meta_descriptions = db.Column('meta_descriptions', db.Text)
    meta_title = db.Column('meta_title', db.VARCHAR(200))
    display_order = db.Column('display_order', db.Enum(
        1, 2, 3, 4, 5, 6, 7, 8, 9), nullable=False)
    is_activated = db.column('is_activated', db.Enum(0, 1), nullable=False)

    def __init__(self, **kwargs):
        super(ProductCategory, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'detail': self.detail,
            'parent_id': self.parent_id,
            'endpoint': self.endpoint,
            'created_by': self.created_by,
            'created_date': self.created_date,
            'updated_by': self.updated_by,
            'updated_date': self.updated_date,
            'meta_keywords': self.meta_keywords,
            'meta_descriptions': self.meta_descriptions,
            'meta_title': self.meta_title,
            'display_order': self.display_order,
            'is_activated': self.is_activated,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        detail = json_post.get('detail')
        parent_id = json_post.get('parent_id')
        endpoint = json_post.get('endpoint')
        created_by = json_post.get('created_by')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_date = json_post.get('updated_date')
        meta_keywords = json_post.get('meta_keywords')
        meta_descriptions = json_post.get('meta_descriptions')
        meta_title = json_post.get('meta_title')
        display_order = json_post.get('display_order')
        is_activated = json_post.get('is_activated')

        productCategory_return = ProductCategory(
            name=name,
            detail=detail,
            parent_id=parent_id,
            endpoint=endpoint,
            created_by=created_by,
            created_date=created_date,
            updated_by=updated_by,
            updated_date=updated_date,
            meta_keywords=meta_keywords,
            meta_descriptions=meta_descriptions,
            meta_title=meta_title,
            display_order=display_order,
            is_activated=is_activated,

        )
        return productCategory_return


