from models.user import User, db
from datetime import datetime


def find_all():
    return User.query.all()


def find_by_id(id):
    return User.query.filter_by(id=id).first()


def find_by_token(token):
    return User.query.filter_by(token=token).first()


def find_by_role(role):
    return User.query.filter_by(role=role).all()


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
        data['updated_date'] = datetime.now()
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


# By email
def find_by_email(email):
    return User.query.filter_by(email=email).first()

# By phone
def find_by_phone(phone):
    return User.query.filter_by(phone=phone).first()

# By score
def find_by_score(score):
    return User.query.filter_by(score=score).first()

# Get Users in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type=1):
    if type == 1:
        return User.query.order_by(User.name.asc())
    else:   
        return User.query.order_by(User.name.desc())
# By score (1: ascending, 2:descending)
def get_order_by_score(type=1):
    if type == 1:
        return User.query.order_by(User.score.asc())
    else:   
        return User.query.order_by(User.score.desc())
