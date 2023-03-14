from init_app import db
import json
from datetime import datetime


class ReviewComment(db.Model):
    __tablename__ = 'review_comment'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column('user_id', db.Integer, nullable=False)
    review_id = db.Column('review_id', db.Integer, nullable=False)
    list_images = db.Column('list_images', db.Text)
    content = db.Column('content', db.Text, nullable=False)
    created_date = db.Column('created_date', db.DateTime, default=datetime.now(), nullable=False)
    updated_date = db.Column('updated_date', db.DateTime)

    def __init__(self, **kwargs):
        super(ReviewComment, self).__init__(**kwargs)

    def to_full_json(self):
        json_token = {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
            'list_images': self.list_images,
            'content': self.content,
            'created_date': self.created_date,
            'updated_date': self.updated_date,
        }
        return json_token

    @staticmethod
    def from_json(json_post):
        user_id = json_post.get('user_id')
        review_id = json_post.get('review_id')
        list_images = json.dumps(json_post.get('list_images'))
        content = json_post.get('content')
        created_date = json_post.get('created_date')
        updated_date = json_post.get('updated_date')

        reviewComment_return = ReviewComment(
            user_id=user_id,
            review_id=review_id,
            list_images=list_images,
            content=content,
            created_date=created_date,
            updated_date=updated_date,
        )
        return reviewComment_return
