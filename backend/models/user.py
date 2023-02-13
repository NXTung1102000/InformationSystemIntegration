from init_app import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    username = db.Column('username', db.VARCHAR(255), unique=True, nullable=False)
    password = db.Column('password', db.Text, nullable=False)
    token = db.Column('token', db.VARCHAR(255))
    role = db.Column('role', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'username': self.username,
            'token': self.token,
            'role': self.role,

        }
        return json_token


    @staticmethod
    def from_json(json_post):
        username = json_post.get('username')
        password = json_post.get('password')
        role = json_post.get('role')

        product_return = User(
            username = username,
            password = password,
            role = role,

        )
        return product_return
