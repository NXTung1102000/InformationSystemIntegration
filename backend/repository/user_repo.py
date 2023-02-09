from models.user import User, db


def find_all():
    return User.query.all()


def find_by_id(id):
    return User.query.filter_by(id=id).first()


def find_by_token(token):
    return User.query.filter_by(token=token).first()


def find_by_username(username):
    return User.query.filter_by(username=username).first()


def find_by_username_and_password(username, password):
    return User.query.filter_by(username=username, password=password).first()


def insert(json_data):
    try:
        user = User.from_json(json_data)
        db.session.add(user)
        db.session.commit()
        return True
    except:
        return False


def update_by_id(id, data):
    try:
        user = User.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        user = find_by_id(id)
        db.session.delete(user)
        db.session.commit()
        return True
    except:
        return False
