import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './style/App.css';
import './style/Landing.css';
import './style/Login.css';
import './style/Group.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import NewGroupPage from './pages/NewGroupPage';
import NewExpensePage from './pages/NewExpensePage';
import GroupsPage from './pages/GroupsPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Group from './pages/Group';
import Profile from './pages/Profile';
import NoMatch from './pages/NoMatch';
import ExpensePage from './pages/ExpensePage';

/*
TODO:
*******************
PROFILE
Making profile
Register -> Profile
Display Profiles in Group
*******************
GROUP
Click on user -> Little popup with link to profile, discord style
Create new group
Add new group member
*******************
EXPENSES
Create expenses form
Be able to deduct money from the expense / pay an expense
  partway
*******************
REGISTER/LOGIN
Abstract away methods to another file/module, import required ones
Admin/User dummy functionality
    Renaming, Deleting Groups
    Edit, Deleting Users
    See how much in total is owed by a user/how much is owed to them
*******************
USER PAGE
See joined groups
See owed debts
See user debts
User info editing
*******************
Some sort of ping system
*/

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/groups' component={GroupsPage} />
            <Route exact path='/groups/new' component={NewGroupPage} />
            <Route exact path='/g/:group_numer/new_expense' component={NewExpensePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/g/:group_number' component={Group} />
            <Route exact path='/u/:user_number' component={Profile} />
            <Route exact path='/e/:expense_number' component={ExpensePage} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
}

export default App;
