import React, { Component } from 'react';
import { AppState } from '../../../store';
import { getComments, toggleComments, clearComments } from '../../../store/comments/actions';
import { connect } from 'react-redux';
import { Comment, CommentsPending, CommentsError } from '../../../store/comments/types';
import { withRouter, RouteComponentProps } from 'react-router';
import CommentItem from '../comment-item/CommentItem';
import Button from '@material-ui/core/Button';
import AddComment from '../add-comment/AddComment';
import Paper from '@material-ui/core/Paper';
import './CommentsList.css';
import Loader from '../../loader/Loader';

interface Props extends RouteComponentProps<any> {
  commetns: Comment[],
  showComments: boolean
  commentsPending: CommentsPending<boolean>
  commentsError: CommentsError<string>
  onGetComments: (postId: number) => any
  onToggleComments: (showComments: boolean) => any
  onClearComments: () => any
}

const mapStateToProps = (state: AppState) => {
  const { commetns, showComments, commentsPending, commentsError } = state.comments
  return { commetns, showComments, commentsPending, commentsError }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetComments: (postId: number) => dispatch(getComments(postId)),
    onToggleComments: (showComments: boolean) => dispatch(toggleComments(showComments)),
    onClearComments: () => dispatch(clearComments())
  }
}

class CommentList extends Component<Props> {
  toggleCommments() {
    const {
      commetns, showComments, onGetComments, onToggleComments, match
    } = this.props 
    
    !!commetns.length ?
      onToggleComments(showComments) :
      onGetComments(match.params.id)
  }

  componentWillUnmount() {
    this.props.onClearComments()
  }

  render() {
    const { commetns, showComments, commentsPending } = this.props
    const commentsList = commetns.map((comment: Comment) => (
      <CommentItem key={comment.id} comment={comment} />
    ))
    const commentsField = (
      <div className="comments-field">
        { showComments? commentsList : null }
      </div>
    )
    return (
      <Paper>
        <div className="comments-list__wrapper">
          <div className="comments-list__buttons">
            <Button onClick={() => this.toggleCommments()}>
              { showComments? 'Hide comments' : 'Show comments' }
            </Button>
            <AddComment />
          </div>

          { commentsPending.getComments ? (<Loader />) : commentsField }
          { commentsPending.addComment ? (<Loader />) : null }
        </div>
      </Paper>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList))