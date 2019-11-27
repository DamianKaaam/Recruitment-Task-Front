export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  companyName: string
  catchPhrase: string
  bs: string
}

export interface UsersPending<T> {
  getUsers: T
}

export interface UsersError<T> {
  getUsers: T
}

export interface UsersState {
  currentUsername: string
  users: User[]
  usersPending: UsersPending<boolean>
  usersError: UsersError<string>
}

export const GET_USERS_PENDING = 'GET_USERS_PENDING'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'

interface GetUsersPendingAction {
  type: typeof GET_USERS_PENDING
}

interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS
  payload: User[]
}

interface GetUsersFailedAction {
  type: typeof GET_USERS_FAILED
  payload: string
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER
  payload: string
}

export type DispatchUsersAction = (action: UsersActionTypes) => UsersActionTypes

export type UsersActionTypes = GetUsersPendingAction | GetUsersSuccessAction | GetUsersFailedAction | SetCurrentUserAction