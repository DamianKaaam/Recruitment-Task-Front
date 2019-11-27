export interface Post {
  userId?: number
  id?: number | string
  title?: string
  body?: string
}

export interface PostsPending<T> {
  getPosts: T
  getPost: T
  addPost: T
  deletePost: T
}

export interface PostsError<T> {
  getPosts: T
  getPost: T
  addPost: T
  deletePost: T
}

export interface PostsState {
  currentPost: Post
  posts: Post[]
  postsPending: PostsPending<boolean>
  postsError: PostsError<string>
}

export const GET_POSTS_PENDING = 'GET_POSTS_PENDING'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'

interface getPostsPendingAction {
  type: typeof GET_POSTS_PENDING
}

interface GetPostsSuccessAction {
  type: typeof GET_POSTS_SUCCESS
  payload: Post[]
}

interface GetPostsFailedAction {
  type: typeof GET_POSTS_FAILED
  payload: string
}

export const GET_POST_PENDING = 'GET_POST_PENDING'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_FAILED = 'GET_POST_FAILED'

interface GetPostPendingAction {
  type: typeof GET_POST_PENDING
}

interface GetPostSuccessAction {
  type: typeof GET_POST_SUCCESS
  payload: Post
}

interface GetPostFailedAction {
  type: typeof GET_POST_FAILED
  payload: string
}

export const ADD_POST_PENDING = 'ADD_POST_PENDING'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILED = 'ADD_POST_FAILED'

interface AddPostPendingAction {
  type: typeof ADD_POST_PENDING
}

interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  payload: Post
}

interface AddPostFailedAction {
  type: typeof ADD_POST_FAILED
  payload: string
}

export const DELETE_POST_PENDING = 'DELETE_POST_PENDING'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'

interface DeletePostPendingAction {
  type: typeof DELETE_POST_PENDING
}

interface DeletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS
  payload: number
}

interface DeletePostFailedAction {
  type: typeof DELETE_POST_FAILED
  payload: string
}

export type DispatchPostsAction= (action: PostsActionTypes) => PostsActionTypes 

export type PostsActionTypes = getPostsPendingAction |
  GetPostsSuccessAction |
  GetPostsFailedAction |
  GetPostPendingAction |
  GetPostSuccessAction |
  GetPostFailedAction |
  AddPostPendingAction |
  AddPostSuccessAction |
  AddPostFailedAction |
  DeletePostPendingAction |
  DeletePostSuccessAction |
  DeletePostFailedAction

