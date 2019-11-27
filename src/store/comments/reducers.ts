import {
  CommentsState, CommentsActionTypes, GET_COMMENTS_PENDING, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILED, SHOW_COMMENTS, HIDE_COMMENTS, ADD_COMMENT_PENDING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED, CLEAR_COMMENTS
} from "./types"

const initialState: CommentsState = {
  commetns: [],
  showComments: false,
  commentsPending: {
    getComments: false,
    addComment: false
  },
  commentsError: {
    getComments: '',
    addComment: ''
  }
}

export function commentsReducer(state = initialState, action: CommentsActionTypes): CommentsState {
  switch (action.type) {
    case GET_COMMENTS_PENDING:
      return { ...state, commentsPending: { ...state.commentsPending, getComments: true } }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        commetns: action.payload,
        showComments: true,
        commentsPending: { ...state.commentsPending, getComments: false }
      }
    case GET_COMMENTS_FAILED:
      return {
        ...state,
        commentsError: { ...state.commentsError, getComments: action.payload },
        showComments: false,
        commentsPending: { ...state.commentsPending, getComments: false }
      }
    case ADD_COMMENT_PENDING:
      return { ...state, commentsPending: { ...state.commentsPending, addComment: true } }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        commetns: [ ...state.commetns, action.payload ],
        showComments: true,
        commentsPending: { ...state.commentsPending, addComment: false }
      }
    case ADD_COMMENT_FAILED:
      return {
        ...state,
        commentsError: { ...state.commentsError, addComment: action.payload },
        commentsPending: { ...state.commentsPending, addComment: false }
      }
    case SHOW_COMMENTS:
      return { ...state, showComments: true }
    case HIDE_COMMENTS:
      return { ...state, showComments: false }
    case CLEAR_COMMENTS:
      return { ...state, commetns: [], showComments: false }
    default:
      return state
  }
}

export default commentsReducer