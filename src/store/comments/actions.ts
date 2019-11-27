import {
  DispatchCommentsAction, GET_COMMENTS_PENDING, Comment, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILED, HIDE_COMMENTS, SHOW_COMMENTS, ADD_COMMENT_PENDING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED, CLEAR_COMMENTS
} from './types';
import API from '../../api'
import { AxiosResponse, AxiosError } from 'axios';

export const getComments = (postId: number) => (dispatch: DispatchCommentsAction) => {
  dispatch({ type: GET_COMMENTS_PENDING })
  API.get(`get-comments?postId=${postId}`)
    .then((response: AxiosResponse<Comment[]>) => dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: response.data 
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: GET_COMMENTS_FAILED,
      payload: error.message
    }))
}

export const addComment = (comment: Comment) => (dispatch: DispatchCommentsAction) => {
  dispatch({ type: ADD_COMMENT_PENDING })
  API.post('post-comment', JSON.stringify(comment))
    .then((response: AxiosResponse<Comment[]>) => dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: comment 
    }))
    .catch((error: AxiosError<any>) => dispatch({
      type: ADD_COMMENT_FAILED,
      payload: error.message
    }))
}

export const clearComments = () => (dispatch: DispatchCommentsAction) => {
  dispatch({ type: CLEAR_COMMENTS })
}

export const toggleComments = (showComments: boolean) => (dispatch: DispatchCommentsAction) => {
  showComments ? dispatch({ type: HIDE_COMMENTS }) : dispatch({ type: SHOW_COMMENTS })
}
