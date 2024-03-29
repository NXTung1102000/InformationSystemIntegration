from repository.voucher_repo import *
# from repository.voucher_type_repo import *


def get_by_id(id):
    comment = find_by_id(id).to_full_json()
    return comment


def get_by_type_id(type_id):
    vouchers = find_by_voucher_type_id(type_id)
    vouchers = list(map(lambda x: x.to_full_json(), vouchers))
    return vouchers 
    

def add(data):
    try:
        insert(data)
        return True
    except:
        return False

    
def update(id, data):
    try:
        update_by_id(id, data)
        return True
    except:
        return False


def delete(id):
    try:
        delete_by_id(id)
        return True
    except:
        return False

