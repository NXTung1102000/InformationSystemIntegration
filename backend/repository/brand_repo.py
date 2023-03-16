from models.brand import Brand, db

# Get all Brands
def find_all():
    return Brand.query.all()

# Get Brands by filtering
# By id
def find_by_id(id):
    return Brand.query.filter_by(id=id).first()

# By name
def find_by_name(name):
    return Brand.query.filter_by(name=name).first()

# Get Brands in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type):
    if type == 1:
        return Brand.query.order_by(Brand.name.asc())
    else:   
        return Brand.query.order_by(Brand.name.desc())


# Insert data
def insert(json_data):
    try:
        brand = Brand.from_json(json_data)
        db.session.add(brand)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        brand = Brand.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        brand = find_by_id(id)
        db.session.delete(brand)
        db.session.commit()
        return True
    except:
        return False