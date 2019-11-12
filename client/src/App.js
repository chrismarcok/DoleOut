import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './style/App.css';
import './style/Landing.css';
import './style/Login.css';
import './style/Group.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './style/NewGroup.css';


import GroupsPage from './pages/GroupsPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Group from './pages/Group';
import Profile from './pages/Profile';
import NoMatch from './pages/NoMatch';


//Dummy components specifically for user, instead of admin.
import USERGroupsPage from './pages/USERGroupsPage';
import USERGroup from './pages/USERGroup';
import USERProfile from './pages/USERProfile';

/*
TODO:
*******************
GROUP
Click on user -> Little popup with link to profile, discord style

*******************
EXPENSES
Variable/uneven debts
*******************
ADMIN FUNCTIONALITY (*)
Different views for admin and user (admin can see remove and edit options)
*******************
USER PAGE
See joined groups
See owed debts
See user debts
*******************
Some sort of ping system
do the README
*/

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/groups' component={USERGroupsPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/g/:group_number' component={USERGroup} />
            <Route exact path='/u/:user_number' component={USERProfile} />

            <Route exact path='/u/:user_number/admin' component={Profile} />
            <Route exact path='/groups/admin' component={GroupsPage} />
            <Route exact path='/g/:group_number/admin' component={Group} />

            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
}

export default App;