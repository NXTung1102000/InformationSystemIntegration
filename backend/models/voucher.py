from init_app import db
from datetime import datetime


class Voucher(db.Model):
    __tablename__ = 'voucher'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(255), unique=True, nullable=False)
    detail = db.Column('detail', db.VARCHAR(255))
    voucher_type_id = db.Column('voucher_type_id', db.Integer, nullable=False)
    code = db.Column('code', db.VARCHAR(20), unique=True, nullable=False)
    image = db.Column('image', db.VARCHAR(255))
    value = db.Column('value', db.Float, nullable=False)
    threshold = db.Column('threshold', db.Float, nullable=False)
    created_by = db.Column('created_by', db.Integer, nullable=False)
    created_date = db.Column('created_date', db.DateTime, default=datetime.now(), nullable=False)
    updated_by = db.Column('updated_by', db.Integer)
    updated_date = db.Column('updated_date', db.DateTime)
    is_activated = db.Column('is_activated', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(Voucher, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'detail': self.detail,
            'voucher_type_id': self.voucher_type_id,
            'code': self.code,
            'image': self.image,
            'value': self.value,
            'threshold': self.threshold,
            'created_by': self.created_by,
            'created_date': self.created_date,
            'updated_by': self.updated_by,
            'updated_date': self.updated_date,
            'is_activated': self.is_activated,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        detail = json_post.get('detail')
        voucher_type_id = json_post.get('voucher_type_id')
        code = json_post.get('code')
        image = json_post.get('image')
        value = json_post.get('value')
        threshold = json_post.get('threshold')
        created_by = json_post.get('created_by')
        created_date = json_post.get('created_date')
        updated_by = json_post.get('updated_by')
        updated_date = json_post.get('updated_date')
        is_activated = json_post.get('is_activated')

        voucher_return = Voucher(
            name=name,
            detail=detail,
            voucher_type_id=voucher_type_id,
            code=code,
            image=image,
            value=value,
            threshold=threshold,
            created_by=created_by,
            created_date=created_date,
            updated_by=updated_by,
            updated_date=updated_date,
            is_activated=is_activated,
        )
        return voucher_return
