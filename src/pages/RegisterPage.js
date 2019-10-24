import React from 'react';
import Header from '../comps/Header.js'
import Footer from '../comps/Footer.js'
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
    console.log(this.state.users)
    if (this.state.username === ""){
      console.log("username should be atleast one char")
    }
    else if (this.state.password.length <= 6){
      console.log("password should be greater than 6 chars")
    }
    else if (this.state.password !== this.state.rePassword){
      console.log("passwords don't match")
    }
    else if (this.checkRegistered(this.state.username)){
      console.log(this.state.username + " already registered")
    }
    else {
      console.log("registered " + this.state.username)
      const newUsers = this.state.users.push(this.makeNewUser(this.state.username, this.state.password))
      this.setState({
        "users": newUsers
      })
      console.log(this.state.users)
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
        
        <Footer/>
      </div>
    )
  }
}

export default RegisterPage;