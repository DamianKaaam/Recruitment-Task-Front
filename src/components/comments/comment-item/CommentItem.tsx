import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Comment } from '../../../store/comments/types';
import './CommentItem.css';

interface Props {
  comment: Comment
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  return (
    <Paper>
      <div className="comment-item__wrapper">
        <div className="comment-item__header">
          <div className="comment-item__header--name">
            <span>{ comment.name }</span>
          </div>
          <div className="comment-item__header--email">
            <span>
              <a href="/">{ comment.email }</a>
            </span>
          </div>
        </div>
        <div className="comment-item__body">
          <span>{ comment.body }</span>
        </div>
      </div>
    </Paper>
  )
}

export default CommentItem