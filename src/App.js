import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './style/App.css'
import './style/Landing.css'
import './style/Login.css'
import './style/Group.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import GroupsPage from './pages/GroupsPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Group from './pages/Group'
import Profile from './pages/Profile'
import NoMatch from './pages/NoMatch'

/*
TODO:
*******************
PROFILE
Making profile
View Profile
Register -> Profile
Display Profiles in Group
*******************
GROUP
Add Messages to group-main-col
Add Expenses to group-main-col
Make sure there is overflow-y: scroll for group-main-col
Click on user -> Little popup with link to profile, discord style
*******************
EXPENSES
Create expenses
Create dummy_expense.JSON
Be able to deduct money from the expense
*******************
REGISTER/LOGIN
Make errors show up
Abstract away methods to another file/module, import required ones
Admin/User dummy functionality
    Renaming, Deleting Groups
    Edit, Deleting Users
    See how much in total is owed by a user/how much is owed to them
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
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/g/:group_number' component={Group}/>
            <Route exact path='/u/:user_number' component={Profile}/>
            <Route component={NoMatch}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
