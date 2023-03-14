from models.role_type import RoleType, db

# Get all RoleTypes
def find_all():
    return RoleType.query.all()

# Get RoleTypes by filtering

# By id
def find_by_id(id):
    return RoleType.query.filter_by(id=id).first()

# By name
def find_by_name(name):
    return RoleType.query.filter_by(name=name).first()

# Insert data
def insert(json_data):
    try:
        roleType = RoleType.from_json(json_data)
        db.session.add(roleType)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        roleType = RoleType.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        roleType = find_by_id(id)
        db.session.delete(roleType)
        db.session.commit()
        return True
    except:
        return False