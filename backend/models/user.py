from init_app import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    username = db.Column('username', db.VARCHAR(255), unique=True, nullable=False)
    password = db.Column('password', db.Text, nullable=False)
    token = db.Column('token', db.VARCHAR(255))
    first_name = db.Column('first_name', db.VARCHAR(255))
    last_name = db.Column('last_name', db.VARCHAR(255))
    email = db.Column('email', db.VARCHAR(255))
    address = db.Column('address', db.VARCHAR(400))
    role = db.Column('role', db.Integer, nullable=False)


    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


    def to_full_json(self):
        json_token = {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'token': self.token,
            'address': self.address,
            'role': self.role,

        }
        return json_token


    @staticmethod
    def from_json(json_post):
        print(json_post)
        username = json_post.get('username')
        password = json_post.get('password')
        role = json_post.get('role')
        address = json_post.get('address')
        first_name = json_post.get('first_name')
        last_name = json_post.get('last_name')
        email = json_post.get('email')

        product_return = User(
            username = username,
            password = password,
            role = role,
            address = address,
            first_name = first_name,
            last_name = last_name,
            email = email,

        )
        return product_return
