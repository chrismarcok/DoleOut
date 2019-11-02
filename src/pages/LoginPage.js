import React from 'react';
import Header from '../comps/Header.js'
import LoginHeader from '../comps/LoginHeader'
import dummy_user_list from './dummy_user_list.json'

class LoginPage extends React.Component {
  //TODO: do something with the inputs. probably should call the functions defined in 
  // registerpage.js. or abstract out those methods in regsiterpage.js and use them in both 
  // login and register js files. (stuff like loading the user JSON and checking if user in user list etc)
  
  state = {
    username: "",
    password: "",
    users: this.fetchUsers()
  }

  fetchUsers () {
    //here would be the code to fetch json users from server. instead just use this dummy list.
    return dummy_user_list
  }

  login(e) {
    if (e.keyCode === 13 || e.target.className === "login-btn"){
      if(!this.checkRegistered(this.state.username) || (this.checkRegistered(this.state.username) && !(this.state.password === this.getUserPassword(this.state.username)))){
        alert("Wrong username or password")
      }
      else{
        const users = this.state.users
        const user = users.filter(user => user.username === this.state.username)
        window.location = "/u/" + user[0].id;
      }
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
            <LoginHeader title="Login"/>
              <form className="login-form">
                <h3>
                  Username
                </h3>
                <input id="login-username" type="text" name="username" placeholder="Username" onChange={this.handleInputChange} onKeyDown={(e) => this.login(e)}></input>
                <h3>
                  Password
                </h3>
                <input id="login-password" type="password" name="password" placeholder="Password" onChange={this.handleInputChange} onKeyDown={(e) => this.login(e)}></input>
                
              </form>
              <button className="login-btn" onClick={(e) => this.login(e)}>Login <i className="fa fa-sign-in"></i></button>
            </div>
          </div>
      </div>
    )
  }
}



export default LoginPage;