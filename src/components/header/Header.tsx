import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import AddPost from '../posts/add-post/AddPost';
import './Header.css';
import Button from '@material-ui/core/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../store';

interface Props extends RouteComponentProps<{}> {
  currentUsername: string
}

const mapStateToProps = (state: AppState) => {
  const { currentUsername } = state.users
  return { currentUsername }
}

class Header extends Component<Props> {
  onHistoryBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="header__wrapper">
        <div className="header__back">
          <Button onClick={ () => this.onHistoryBack() }>
            <Icon color="primary">arrow_back</Icon>
          </Button>
        </div>
        <div className="header__username">
          <span>{ this.props.currentUsername }</span>
        </div>
        <div className="header__action">
          { this.props.location.pathname.includes('/user/') ? (<AddPost />) : null }
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Header))