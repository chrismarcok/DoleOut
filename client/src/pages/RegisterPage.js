import React from 'react';
import Header from '../comps/Header.js'
import LoginHeader from '../comps/LoginHeader.js'
import Helper from '../scripts/helper.js';

const regex = RegExp('^([a-zA-Z0-9 _-]+)$');

class RegisterPage extends React.Component {

  state = {
    username: "",
    password: "",
    rePassword: "",
    users: []
  }

  /**
   * Checks if the username is in the master user list.
   */
  checkRegistered(username){
    return false;
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
        e.preventDefault();
      } 
      else if (!regex.test(this.state.username)) {
        alert("your username should match /^([a-zA-Z0-9 _-]+)$/")
        e.preventDefault();
      }
      else if (this.state.password.length <= 3){
        alert("your password should have more than 3 characters")
        e.preventDefault();
      }
      else if (this.state.password !== this.state.rePassword){
        alert("the passwords don't match")
        e.preventDefault();
      }
      else if (this.checkRegistered(this.state.username)){
        alert(this.state.username + " is already registered")
        e.preventDefault();
      }
      else {
        console.log("Posting...");
      }
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="login-container">
          <div className="login-inner">
            <LoginHeader title="Register"/>
            <form className="login-form" action="/register" method="post">
              <h3>
                Username
              </h3>
              <input id="register-username" type="text" required name="username" placeholder="Username" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              <h3>
                Password
              </h3>
              <input id="register-password" type="password" required name="password" placeholder="Password" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              <h3>
                Confirm Password
              </h3>
              <input id="register-repassword" type="password" required name="rePassword" placeholder="Password" onChange={Helper.handleInputChange.bind(this)} onKeyDown={(e) => this.register(e)}></input>
              <button className="register-btn" type="submit" onClick={(e) => {this.register(e)}}>Register <i className="fa fa-user-plus"></i></button>  
            </form>
            
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage;