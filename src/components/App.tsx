import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import UsersList from './users/users-list/UsersList';
import UserDetails from './users/user-details/UserDetails';
import PostDetails from './posts/post-details/PostDetails';
import Container from '@material-ui/core/Container';
import NotFound from './not_found/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="xl">
          <Switch>
            <Route exact path='/' component={UsersList}/>
            <Route path='/user/:id' component={UserDetails}/>
            <Route path='/post/:id' component={PostDetails}/>
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
