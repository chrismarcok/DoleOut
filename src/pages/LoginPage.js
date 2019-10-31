import React from 'react';
import Header from '../comps/Header.js'
import Footer from '../comps/Footer.js'
import LoginHeader from '../comps/LoginHeader'

class LoginPage extends React.Component {
  //TODO: do something with the inputs. probably should call the functions defined in 
  // registerpage.js. or abstract out those methods in regsiterpage.js and use them in both 
  // login and register js files. (stuff like loading the user JSON and checking if user in user list etc)
  
  state = {
    username: "",
    password: "",
    users: []
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
                <input id="login-username" type="text" name="username" placeholder="Username"></input>
                <h3>
                  Password
                </h3>
                <input id="login-password" type="password" name="password" placeholder="Password"></input>
                
              </form>
              <button>Login <i className="fa fa-sign-in"></i></button>
            </div>
          </div>
        <Footer/>
      </div>
    )
  }
}



export default LoginPage;