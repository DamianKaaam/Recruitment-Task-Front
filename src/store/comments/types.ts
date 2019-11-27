export interface Comment {
  postId: number
  id?: number | string
  name: string
  email: string
  body: string
}

export interface CommentsPending<T> {
  getComments: T
  addComment: T
}

export interface CommentsError<T> {
  getComments: T
  addComment: T
}

export interface CommentsState {
  commetns: Comment[]
  showComments: boolean
  commentsPending: CommentsPending<boolean>
  commentsError: CommentsError<string>
}

export const GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAILED = 'GET_COMMENTS_FAILED'

interface GetCommentsPendingAction {
  type: typeof GET_COMMENTS_PENDING
}

interface GetCommentsSuccessAction {
  type: typeof GET_COMMENTS_SUCCESS
  payload: Comment[]
}

interface GetCommentsFailedAction {
  type: typeof GET_COMMENTS_FAILED
  payload: string
}

export const ADD_COMMENT_PENDING = 'ADD_COMMENT_PENDING'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED'

interface AddCommentPendingAction {
  type: typeof ADD_COMMENT_PENDING
}

interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS
  payload: Comment
}

interface AddCommentFailedAction {
  type: typeof ADD_COMMENT_FAILED
  payload: string
}

export const SHOW_COMMENTS = 'SHOW_COMMENTS'
export const HIDE_COMMENTS = 'HIDE_COMMENTS'

interface ShowCommentsAction {
  type: typeof SHOW_COMMENTS
}

interface HideCommentsAction {
  type: typeof HIDE_COMMENTS
}

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'

interface CleatCommentsAction {
  type: typeof CLEAR_COMMENTS
}

export type DispatchCommentsAction = (action: CommentsActionTypes) => CommentsActionTypes

export type CommentsActionTypes = GetCommentsPendingAction |
  GetCommentsSuccessAction |
  GetCommentsFailedAction |
  AddCommentPendingAction |
  AddCommentSuccessAction |
  AddCommentFailedAction |
  ShowCommentsAction |
  HideCommentsAction |
  CleatCommentsAction