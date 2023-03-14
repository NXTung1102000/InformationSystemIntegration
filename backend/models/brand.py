from init_app import db


class Brand(db.Model):
    __tablename__ = 'brand'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(50))
    detail = db.Column('detail', db.Text)
    image = db.Column('image', db.VARCHAR(255))
    is_activated = db.Column('is_activated', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(Brand, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'detail': self.detail,
            'image': self.image,
            'is_activated': self.is_activated,
        }
        return json_token


    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        detail = json_post.get('detail')
        image = json_post.get('image')
        is_activated = json_post.get('is_activated')

        brand_return = Brand(
            name=name,
            detail=detail,
            image=image,
            is_activated=is_activated,
        )
        return brand_return
