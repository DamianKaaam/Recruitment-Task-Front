import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { User } from '../../../store/users/types';
import Button from '@material-ui/core/Button';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './UserProfile.css'
import { connect } from 'react-redux';
import { setCurrentUsername } from '../../../store/users/actions';

interface Props extends RouteComponentProps<{}> {
  user: User
  onSetCurrentUsername: (username: string) => any
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetCurrentUsername: (username: string) => dispatch(setCurrentUsername(username))
  }
}

class UserProfile extends Component<Props> {
  
  goToUserDetails(user: User) {
    const { onSetCurrentUsername, history } = this.props
    onSetCurrentUsername(user.name)
    history.push(`/user/${user.id}`)
  }
  
  render() {
    const { user } = this.props;
    const [ phone ] = user.phone.split(' ')
    return (
      <Paper>
        <div className="user-profile__wrapper">
          <div className="user-profile">
            <div className="user-profile__name">
              <h3>{ user.name }</h3>
            </div>
            <div className="user-profile__contact-details">
              <span className="user-profile__contact-details--email">
                <a href="/">{ user.email }</a>
              </span>
              <span className="user-profile__contact-details--phone">
                <a href="/">{ phone }</a>
              </span>
              <span className="user-profile__contact-details--website">
                <a href="/">{ user.website }</a>
              </span>
            </div>
            <div className="user-profile__company">
              <span className="user-profile__company--name">
                { user.companyName }
              </span>
              <span className="user-profile__company--catchPhrase">
                { user.catchPhrase }
              </span>
              <span className="user-profile__company--bs">
                { user.bs }
              </span>
            </div>
          </div>
          <div className="user-profile__details-button">
            <Button onClick={ () => this.goToUserDetails(user) } variant="contained" color="primary">
              DETAILS
            </Button>
          </div>
        </div>
    </Paper>
    )
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserProfile))