import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../header/Header';
import { Post, PostsPending, PostsError } from '../../../store/posts/types';
import { AppState } from '../../../store';
import { getPosts } from '../../../store/posts/actions';
import { RouteComponentProps } from 'react-router';
import PostItem from '../../posts/post-item/PostItem';
import Loader from '../../loader/Loader';

interface Props extends RouteComponentProps<any> {
  posts: Post[]
  postsPending: PostsPending<boolean>
  postsError: PostsError<string>
  onGetPosts: (userId: number) => any
}

const mapStateToProps = (state: AppState) => {
  const { posts, postsPending, postsError } = state.posts
  return { posts, postsPending, postsError }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetPosts: (userId: number) => dispatch(getPosts(userId))
  }
}

class UserDetails extends Component<Props> {
  componentDidMount(): void {
    const { id } = this.props.match.params;
    this.props.onGetPosts(id);
  }

  render() {
    const { posts, postsPending } = this.props
    const postList = posts.map((post: Post) => (
      <PostItem key={post.id} post={post} />
    ))

    return (
      <div>
        <Header />
        { postsPending.getPosts ? (<Loader />) : postList }
        { postsPending.deletePost ? ( <Loader /> ) : null }
        { postsPending.addPost ? ( <Loader /> ) : null }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)