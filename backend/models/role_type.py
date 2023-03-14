from init_app import db


class RoleType(db.Model):
    __tablename__ = 'role_type'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    name = db.Column('name', db.VARCHAR(50))
    detail = db.Column('detail', db.Text)
    is_activated = db.Column('is_activated', db.Integer, nullable=False)

    def __init__(self, **kwargs):
        super(RoleType, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'name': self.name,
            'detail': self.detail,
            'is_activated': self.is_activated,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        name = json_post.get('name')
        detail = json_post.get('detail')
        is_activated = json_post.get('is_activated')

        accountType_return = RoleType(
            name=name,
            detail=detail,
            is_activated=is_activated,
        )
        return accountType_return
