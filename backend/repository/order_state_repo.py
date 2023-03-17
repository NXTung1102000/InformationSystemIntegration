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
        order_state = OrderState.from_json(json_data)
        db.session.add(order_state)
        db.session.commit()
        return True
    except:
        return False

# Update data
def update_by_id(id, data):
    try:
        order_state = OrderState.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False

# Delete data
def delete_by_id(id):
    try:
        order_state = find_by_id(id)
        db.session.delete(order_state)
        db.session.commit()
        return True
    except:
        return False

