from models.review_comment import ReviewComment, db
from sqlalchemy import func

# Get all comments
def find_all():
    return ReviewComment.query.all()
# Get comments by filtering
# By id
def find_by_id(id):
    return ReviewComment.query.filter_by(id=id).first()
# By user_id
def find_by_user_id(user_id):
    return ReviewComment.query.filter_by(user_id=user_id).all()
# By review_id
def find_by_review_id(review_id):
    return ReviewComment.query.filter_by(review_id=review_id).all()

# Get review of review_id in order
# By review_id
def get_order_by_review_id(type=1):
    if type == 1:
        return ReviewComment.query.order_by(ReviewComment.review_id.asc())
    else:   
        return ReviewComment.query.order_by(ReviewComment.review_id.desc())

def insert(json_data):
    try:
        reviewComment = ReviewComment.from_json(json_data)
        db.session.add(reviewComment)
        db.session.commit()
        return reviewComment
    except:
        return False

def update_by_id(id, data):
    try:
        reviewComment = ReviewComment.query.filter_by(id=id).update(data)
        db.session.commit()
        return True
    except:
        return False
    

def delete_by_id(id):
    try:
        reviewComment = find_by_id(id)
        db.session.delete(reviewComment)
        db.session.commit()
        return True
    except:
        return False