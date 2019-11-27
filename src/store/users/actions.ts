import {
 GET_USERS_PENDING, User, GET_USERS_SUCCESS, GET_USERS_FAILED, DispatchUsersAction, UsersActionTypes, SET_CURRENT_USER
} from './types';
import API from '../../api'
import { AxiosResponse } from 'axios';

export const getUsers = () => (dispatch: DispatchUsersAction) => {
  dispatch({ type: GET_USERS_PENDING })
  API.get('get-users')
    .then((response: AxiosResponse<User[]>) => dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data 
    }))
    .catch(error => dispatch({
      type: GET_USERS_FAILED,
      payload: error
    }))
}

export const setCurrentUsername = (username: string): UsersActionTypes => ({
  type: SET_CURRENT_USER,
  payload: username
})