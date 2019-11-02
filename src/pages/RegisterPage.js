import React from 'react';
import Header from '../comps/Header.js'
import LoginHeader from '../comps/LoginHeader.js'
import dummy_user_list from './dummy_user_list.json'

class RegisterPage extends React.Component {

  state = {
    username: "",
    password: "",
    rePassword: "",
    users: this.fetchUsers()
  }

  fetchUsers () {
    //here would be the code to fetch json users from server. instead just use this dummy list.
    return dummy_user_list
  }

  checkRegistered(username){
    const user = this.state.users.filter(user => user.username === username)
    return user.length > 0
  }

  register() {
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
      alert(this.state.username + " has been registered.")
      const newUsers = this.state.users.push(this.makeNewUser(this.state.username, this.state.password))
      this.setState({
        "users": newUsers
      });
    }
  }

  makeNewUser(username, password){
    return {
      id: 123,
      username: username,
      password: password
    }
  }

  //Updates the state
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    })
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
              <input id="register-username" type="text" name="username" placeholder="Username" onChange={this.handleInputChange}></input>
              <h3>
                Password
              </h3>
              <input id="register-password" type="password" name="password" placeholder="Password" onChange={this.handleInputChange}></input>
              <h3>
                Confirm Password
              </h3>
              <input id="register-repassword" type="password" name="rePassword" placeholder="Password" onChange={this.handleInputChange}></input>
              
            </form>
            <button onClick={() => this.register()}>Register <i className="fa fa-user-plus"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage;