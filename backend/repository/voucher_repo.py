from models.voucher import Voucher, db


def find_all():
    return Voucher.query.all()

def find_by_id(id):
    return Voucher.query.filter_by(id=id).first()

def find_by_name(name):
    return Voucher.query.filter(Voucher.name.like(f'%{name}%')).all()

def find_by_code(code):
    return Voucher.query.filter_by(code=code).first()

def insert(json_data):
    try:
        voucher = Voucher.from_json(json_data)
        db.session.add(voucher)
        db.session.commit()
        return True
    except:
        return False


def update_by_id(id, data):
    try:
        voucher = Voucher.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        voucher = find_by_id(id)
        db.session.delete(voucher)
        db.session.commit()
        return True
    except:
        return False



