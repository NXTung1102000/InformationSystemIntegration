from models.account import Account, db

# Get all accounts
def find_all():
    return Account.query.all()

# Get accounts by filtering
# By id
def find_by_id(id):
    return Account.query.filter_by(id=id).first()
# By role
def find_by_role(role):
    role = role.lower()
    if (role == "admin"):
        accounttype_id = 1
    elif (role == "staff"):
        accounttype_id = 2
    else:
        accounttype_id = 3
    return Account.query.filter_by(accounttype_id=accounttype_id).all()
# By email
def find_by_email(email):
    return Account.query.filter_by(email=email).first()
# By phone
def find_by_phone(phone):
    return Account.query.filter_by(phone=phone).first()
# By username
def find_by_username(username):
    return Account.query.filter_by(username=username).first()
# By username and password
def find_by_username_and_password(username, password):
    return Account.query.filter_by(username=username, password=password).first()
# By score
def find_by_score(score):
    return Account.query.filter_by(score=score).first()
# By name
def find_by_name(name):
    return Account.query.filter_by(name=name).all()

# Get accounts in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type):
    if type == 1:
        return Account.query.order_by(Account.name.asc())
    else:   
        return Account.query.order_by(Account.name.desc())
# By score (1: ascending, 2:descending)
def get_order_by_score(type):
    if type == 1:
        return Account.query.order_by(Account.score.asc())
    else:   
        return Account.query.order_by(Account.score.desc())

# Insert data
def insert(json_data):
    try:
        account = Account.from_json(json_data)
        db.session.add(account)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        account = Account.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False


# Delete data
def delete_by_id(id):
    try:
        account = find_by_id(id)
        db.session.delete(account)
        db.session.commit()
        return True
    except:
        return False