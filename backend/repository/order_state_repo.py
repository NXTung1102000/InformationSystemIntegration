from models.order_state import OrderState, db

# Get all OrderStates
def find_all():
    return OrderState.query.all()

# Get OrderStates by filtering
# By id
def find_by_id(id):
    return OrderState.query.filter_by(id=id).first()


# Insert data
def insert(json_data):
    try:
        orderState = OrderState.from_json(json_data)
        db.session.add(orderState)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        orderState = OrderState.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        orderState = find_by_id(id)
        db.session.delete(orderState)
        db.session.commit()
        return True
    except:
        return False

