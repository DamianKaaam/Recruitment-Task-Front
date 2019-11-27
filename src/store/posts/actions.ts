
import { DispatchPostsAction, GET_POSTS_PENDING, Post, GET_POSTS_SUCCESS, GET_POSTS_FAILED, GET_POST_PENDING, GET_POST_SUCCESS, GET_POST_FAILED, DELETE_POST_PENDING, DELETE_POST_SUCCESS, DELETE_POST_FAILED, ADD_POST_PENDING, ADD_POST_SUCCESS, ADD_POST_FAILED } from './types';
import API from '../../api'
import { AxiosResponse, AxiosError } from 'axios';
 
export const getPosts = (userId: number) => (dispatch: DispatchPostsAction) => {
  dispatch({ type: GET_POSTS_PENDING })
  API.get(`get-posts?userId=${userId}`)
    .then((response: AxiosResponse<Post[]>) => dispatch({
      type: GET_POSTS_SUCCESS,
      payload: response.data 
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: GET_POSTS_FAILED,
      payload: error.message
    }))
}

export const getPost = (postId: number) => (dispatch: DispatchPostsAction) => {
  dispatch({ type: GET_POST_PENDING })
  API.get(`get-post/${postId}`)
    .then((response: AxiosResponse<Post>) => dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: GET_POST_FAILED,
      payload: error.message
    }))
}

export const addPost = (post: Post) => (dispatch: DispatchPostsAction) => {
  console.log('halko', post);
  dispatch({ type: ADD_POST_PENDING })
  API.post('post-post', JSON.stringify(post))
    .then((response: AxiosResponse<Post>) => dispatch({
      type: ADD_POST_SUCCESS,
      payload: post
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: ADD_POST_FAILED,
      payload: error.message
    }))
}


export const deletePost = (postId: number) => (dispatch: DispatchPostsAction) => {
  dispatch({ type: DELETE_POST_PENDING })
  API.delete(`delete-post/${postId}`)
    .then((response: AxiosResponse<{}>) => dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: DELETE_POST_FAILED,
      payload: error.message
    }))
} 