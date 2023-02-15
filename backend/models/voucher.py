from init_app import db
import json
from user import User

class VoucherType(db.Model):
    __tablename__ = 'voucher_type'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String)
    detail = db.Column('detail', db.Text)
    is_activated = db.Column('is_activated', db.Boolean)

    def __init__(self, **kwargs):
        super(VoucherType, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'detail': self.detail,
            'is_activated': self.is_activated
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        id = json_post.get('id')
        name = json_post.get('name')
        detail = json_post.get('detail')
        is_activated = json_post.get('is_activated')


        voucher_type_return = VoucherType(
            id = id,
            name = name,
            detail = detail,
            is_activated = is_activated,
        )
        return voucher_type_return

class Voucher(db.Model):
    __tablename__ = 'voucher'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.String, unique=True, nullable=False)
    detail = db.Column('detail', db.Text)
    voucher_type_id = db.Column('voucher_type_id', db.ForeignKey('voucher_type.id'), nullable=False)
    code = db.Column('code', db.String)
    image = db.Column('image', db.String)
    value = db.Column('value', db.Float)
    threshold = db.Column('threshold', db.Float)
    created_by = db.Column('created_by', db.ForeignKey('user.id'))
    created_date = db.Column('created_date', db.Datetime)
    updated_by = db.Column('updated_by', db.ForeignKey('user.id'))
    updated_date = db.Column('updated_date', db.Datetime)
    is_activated = db.Column('is_activated', db.Boolean)


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
        id = json_post.get('id')
        name = json_post.get('name')
        detail = json_post.get('specification')
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
            id = id,
            name = name,
            detail = detail,
            voucher_type_id = voucher_type_id,
            code = code,
            image = image,
            value = value,
            threshold = threshold,
            created_by = created_by,
            created_date = created_date,
            updated_by = updated_by,
            updated_date = updated_date,
            is_activated = is_activated,
        )
        return voucher_return
