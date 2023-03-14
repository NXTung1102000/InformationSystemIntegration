from models.voucher_type import VoucherType, db

# Get all VoucherTypes
def find_all():
    return VoucherType.query.all()

# Get VoucherTypes by filtering
# By id
def find_by_id(id):
    return VoucherType.query.filter_by(id=id).first()

# Insert data
def insert(json_data):
    try:
        voucherType = VoucherType.from_json(json_data)
        db.session.add(voucherType)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        voucherType = VoucherType.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        voucherType = find_by_id(id)
        db.session.delete(voucherType)
        db.session.commit()
        return True
    except:
        return False



