import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { User, UsersPending, UsersError } from '../../../store/users/types';
import { getUsers } from '../../../store/users/actions';
import UserProfile from '../user-profile/UserProfile';
import './UsersList.css'
import Grid from '@material-ui/core/Grid';
import Loader from '../../loader/Loader';

interface Props {
  users: User[]
  usersPending: UsersPending<boolean>
  usersError: UsersError<string>
  onGetUsers: () => any
}

const mapStateToProps = (state: AppState) => {
  const { users, usersPending, usersError } = state.users
  return { users, usersPending, usersError }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetUsers: () => dispatch(getUsers())
  }
}

class UsersList extends Component<Props> {
  componentDidMount() {
    this.props.onGetUsers();
  }
  
  render() {
    const { users, usersPending } = this.props
    const usersList = users.map((user: User) => (
      <Grid item xs={12} md={6} lg={3} key={user.id}>
        <UserProfile user={user} />
      </Grid>
    ))
    return (
      <div className="user-list__wrapper">
        <Grid container spacing={6}>
          { usersPending.getUsers ? (< Loader />) : usersList }
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)