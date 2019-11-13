import React from 'react';
import Header from '../comps/Header.js'
import LoginHeader from '../comps/LoginHeader'
import Fetch from '../scripts/fetch.js';
import Helper from '../scripts/helper.js';

class LoginPage extends React.Component {
  
  state = {
    username: "",
    password: "",
    users: Fetch.fetchUsers()
  }

  login(e) {
    if (e.keyCode === 13 || e.target.className === "login-btn"){
      console.log("attempting to post...")
    } 
  }

  getUserPassword(username){
    const users = this.state.users
    const user = users.filter(user => user.username === username)
    return user[0].password
  }

  checkRegistered(username){
    const users = this.state.users
    const user = users.filter(user => user.username === username)
    return user.length > 0
  }
  
  render() {
    return (
      <div>
        <Header/>
          <div className="login-container">
            <div className="login-inner">
            <LoginHeader title="Login"/>
              <form className="login-form" action="/login" method="post">
                <h3>
                  Username
                </h3>
                <input id="login-username" type="text" name="username" placeholder="Username" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.login(e)}></input>
                <h3>
                  Password
                </h3>
                <input id="login-password" type="password" name="password" placeholder="Password" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.login(e)}></input>
                <button className="login-btn" type="submit" onClick={(e) => this.login(e)}>Login <i className="fa fa-sign-in"></i></button>  
              </form>
            </div>
          </div>
      </div>
    )
  }
}



export default LoginPage;