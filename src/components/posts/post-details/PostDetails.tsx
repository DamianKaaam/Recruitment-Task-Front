import React, { Component } from 'react';
import Header from '../../header/Header';
import { AppState } from '../../../store';
import { connect } from 'react-redux';
import { getPost } from '../../../store/posts/actions';
import { Post, PostsPending, PostsError } from '../../../store/posts/types';
import { RouteComponentProps } from 'react-router';
import CommentsList from '../../comments/comments-list/CommentsList';
import './PostDetails.css';
import Loader from '../../loader/Loader';

interface Props extends RouteComponentProps<any> {
  currentPost: Post
  postsPending: PostsPending<boolean>
  postsError: PostsError<string>
  onGetPost: (postId: number) => any
}

const mapStateToProps = (state: AppState) => {
  const { currentPost, postsPending, postsError } = state.posts
  return { currentPost, postsPending, postsError }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetPost: (postId: number) => dispatch(getPost(postId))
  }
}

class PostDetails extends Component<Props> {
  componentDidMount(): void {
    this.props.onGetPost(this.props.match.params.id)
  }

  render() {
    const { currentPost, postsPending } = this.props
    return (
      <div>
        <Header />
        { postsPending.getPost ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="post-details-wrapper">
            <div className="post-details-title">
              <h2>{ currentPost.title }</h2>
            </div>
            <div className="post-details-body">
              <p>
                { currentPost.body }
              </p>
            </div>
          </div>
        ) }
        <CommentsList />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)