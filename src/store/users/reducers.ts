import {
  UsersState, UsersActionTypes, GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_FAILED, SET_CURRENT_USER,
} from "./types"

const initialState: UsersState = {
  currentUsername: '',
  users: [],
  usersPending: {
    getUsers: false
  },
  usersError: {
    getUsers: ''
  }
}

export function usersReducer(state = initialState, action: UsersActionTypes): UsersState {
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, usersPending: { ...state.usersPending, getUsers: true } }
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, usersPending: { ...state.usersPending, getUsers: false } }
    case GET_USERS_FAILED:
      return {
        ...state,
        usersError: { ...state.usersError, getUsers: action.payload },
        usersPending: { ...state.usersPending, getUsers: false }
      }
    case SET_CURRENT_USER:
      return { ...state, currentUsername: action.payload }
    default:
      return state
  }
}

export default usersReducer