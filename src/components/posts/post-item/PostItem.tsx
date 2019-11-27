import React, { Component } from 'react';
import { Post } from '../../../store/posts/types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './PostItem.css';
import { deletePost } from '../../../store/posts/actions';

interface Props extends RouteComponentProps<{}> {
  post: Post
  onPostDelete: (postId: any) => any
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPostDelete: (postId: number) => dispatch(deletePost(postId)) 
  }
}

class PostItem extends Component<Props> {
  goToPostDetails(postId: number) {
    this.props.history.push(`/post/${postId}`)
  }

  render() {
    const { post, onPostDelete } = this.props
    return (
      <Paper>
        <div className="post_item__wrapper">
          <div className="post_item__delete">
            <Button onClick={ () => onPostDelete(post.id) }>
              <Icon color="primary">delete</Icon>
            </Button>
          </div>
          <div onClick={ () => this.goToPostDetails(post.id as number) } className="post_item__detail">
            <div className="post_item__detail--title">
              <span>{ post.title }</span>
            </div>
            <div className="post_item__detail--arrow">
              <Icon color="primary">arrow_forward_ios_sharp</Icon>
            </div>
          </div>
        </div>
      </Paper>
    )

  }
}
 
export default withRouter(connect(null, mapDispatchToProps)(PostItem))