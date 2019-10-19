import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import './Landing.css'

import GroupsPage from './GroupsPage';
import LandingPage from './LandingPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch> 
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/groups' component={GroupsPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
