from models.voucher import Voucher, db

# Get all vouchers
def find_all():
    return Voucher.query.all()

# Get vouchers by filtering
# By id
def find_by_id(id):
    return Voucher.query.filter_by(id=id).first()

# By voucher_type_id
def find_by_voucher_type_id(type=1):
    return Voucher.query.filter_by(voucher_type_id=type).all()

# By name
def find_by_name(name):
    return Voucher.query.filter_by(name=name).first()

# By code
def find_by_code(code):
    return Voucher.query.filter_by(code=code).first()

# Get vouchers in order
# By name (1: ascending, 2:descending)
def get_order_by_name(type=1):
    if type == 1:
        return Voucher.query.order_by(Voucher.name.asc())
    else:   
        return Voucher.query.order_by(Voucher.name.desc())
    
# By voucher_type (1: ascending, 2:descending)
def get_order_by_voucher_type_id(type=1):
    if type == 1:
        return Voucher.query.order_by(Voucher.voucher_type_id.asc())
    else:   
        return Voucher.query.order_by(Voucher.voucher_type_id.desc())
    
# By value (1: ascending, 2:descending)
def get_order_by_value(type=1):
    if type == 1:
        return Voucher.query.order_by(Voucher.value.asc())
    else:   
        return Voucher.query.order_by(Voucher.value.desc())
# By voucher_type and value (1: ascending, 2:descending)
def get_order_by_value_and_voucher_type(type, voucher_type_id):
    if type == 1:
        return Voucher.query.filter(voucher_type_id=voucher_type_id).order_by(Voucher.value.asc())
    else:   
        return Voucher.query.filter(voucher_type_id=voucher_type_id).order_by(Voucher.value.desc())
    
# By voucher_type and threshold (1: ascending, 2:descending)
def get_order_by_threshold_and_voucher_type(type, voucher_type_id):
    if type == 1:
        return Voucher.query.filter(voucher_type_id=voucher_type_id).order_by(Voucher.threshold.asc())
    else:   
        return Voucher.query.filter(voucher_type_id=voucher_type_id).order_by(Voucher.threshold.desc())

# Insert data
def insert(json_data):
    try:
        voucher = Voucher.from_json(json_data)
        db.session.add(Voucher)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        voucher = Voucher.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        voucher = find_by_id(id)
        db.session.delete(voucher)
        db.session.commit()
        return True
    except:
        return False


