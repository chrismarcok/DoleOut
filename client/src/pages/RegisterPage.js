import React from 'react';
import Header from '../comps/Header.js'
import LoginHeader from '../comps/LoginHeader.js'
import Fetch from '../scripts/fetch.js';
import Helper from '../scripts/helper.js';

class RegisterPage extends React.Component {

  state = {
    username: "",
    password: "",
    rePassword: "",
    users: Fetch.fetchUsers()
  }

  /**
   * Checks if the username is in the master user list.
   */
  checkRegistered(username){
    const user = this.state.users.filter(user => user.username === username);
    return user.length > 0;
  }

  /**
   * Registers a new user if all the input fields are valid.
   * Would need a server call to update our database with the new user.
   */
  register(e) {
    //button or enter key
    if (e.keyCode === 13 || e.target.className === "register-btn"){
      if (this.state.username === ""){
        alert("your username should have at least one character")
      }
      else if (this.state.password.length <= 6){
        alert("your password should have more than 6 characters")
      }
      else if (this.state.password !== this.state.rePassword){
        alert("the passwords don't match")
      }
      else if (this.checkRegistered(this.state.username)){
        alert(this.state.username + " is already registered")
      }
      else {
        // Should redirect you to the profile you just made. for now just redirect to the default user's profile.
        const newUsers = this.state.users.push(this.makeNewUser(this.state.username, this.state.password))
        this.setState({
          "users": newUsers
        });
        window.location = "/u/1";
      }
    }
  }

  makeNewUser(username, password){
    return {
      id: 123,
      username: username,
      password: password
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="login-container">
          <div className="login-inner">
            <LoginHeader title="Register"/>
            <form className="login-form">
              
              <h3>
                Username
              </h3>
              <input id="register-username" type="text" name="username" placeholder="Username" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              <h3>
                Password
              </h3>
              <input id="register-password" type="password" name="password" placeholder="Password" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              <h3>
                Confirm Password
              </h3>
              <input id="register-repassword" type="password" name="rePassword" placeholder="Password" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              
            </form>
            <button className="register-btn" onClick={(e) => this.register(e)}>Register <i className="fa fa-user-plus"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage;