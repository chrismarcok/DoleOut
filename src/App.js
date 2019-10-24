import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './style/App.css';
import './style/Landing.css'
import './style/Login.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import GroupsPage from './pages/GroupsPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

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
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
