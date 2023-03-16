from models.accountType import AccountType, db

# Get all AccountTypes
def find_all():
    return AccountType.query.all()

# Get AccountTypes by filtering
# By id
def find_by_id(id):
    return AccountType.query.filter_by(id=id).first()
# By name
def find_by_name(name):
    return AccountType.query.filter_by(name=name).first()

# Insert data
def insert(json_data):
    try:
        accountType = AccountType.from_json(json_data)
        db.session.add(accountType)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        accountType = AccountType.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        accountType = find_by_id(id)
        db.session.delete(accountType)
        db.session.commit()
        return True
    except:
        return False