import { PostsState, PostsActionTypes, GET_POSTS_PENDING, GET_POSTS_SUCCESS, GET_POSTS_FAILED, GET_POST_PENDING, GET_POST_SUCCESS, GET_POST_FAILED, ADD_POST_PENDING, ADD_POST_SUCCESS, ADD_POST_FAILED, DELETE_POST_PENDING, DELETE_POST_SUCCESS, DELETE_POST_FAILED } from "./types"

const initialState: PostsState = {
  currentPost: {},
  posts: [],
  postsPending: {
    getPosts: false,
    getPost: false,
    addPost: false,
    deletePost: false
  },
  postsError: {
    getPosts: '',
    getPost: '',
    addPost: '',
    deletePost: ''
  }
}

export function postsReducer(state = initialState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case GET_POSTS_PENDING:
      return { ...state, postsPending: { ...state.postsPending, getPosts: true } }
    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload, postsPending: { ...state.postsPending, getPosts: false } }
    case GET_POSTS_FAILED:
      return {
        ...state,
        postsError: { ...state.postsError, getPosts: action.payload },
        postsPending: { ...state.postsPending, getPosts: false }
      }
    case GET_POST_PENDING:
      return { ...state, postsPending: { ...state.postsPending, getPost: true } }
    case GET_POST_SUCCESS:
      return { ...state, currentPost: action.payload, postsPending: { ...state.postsPending, getPost: false } }
    case GET_POST_FAILED:
      return {
        ...state,
        postsError: { ...state.postsError, getPost: action.payload },
        postsPending: { ...state.postsPending, getPost: false }
      }
    case ADD_POST_PENDING:
      return { ...state, postsPending: { ...state.postsPending, addPost: true } }
    case ADD_POST_SUCCESS:
      return { ...state, posts: [ ...state.posts, action.payload ], postsPending: { ...state.postsPending, addPost: false }
      }
    case ADD_POST_FAILED:
      return {
        ...state,
        postsError: { ...state.postsError, addPost: action.payload },
        postsPending: { ...state.postsPending, addPost: false }
      }
    case DELETE_POST_PENDING:
      return { ...state, postsPending: { ...state.postsPending, deletePost: true }
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        postsPending: { ...state.postsPending, deletePost: false }
      }
    case DELETE_POST_FAILED:
      return {
        ...state,
        postsError: { ...state.postsError, deletePost: action.payload },
        postsPending: { ...state.postsPending, deletePost: false }
      }
    default:
      return state
  }
}

export default postsReducer