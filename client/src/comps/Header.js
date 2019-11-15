import React from 'react';
import Axios from 'axios';

class Header extends React.Component {
  componentDidMount(){
    if (this.props.user === "admin"){
      document.querySelector("#header-login").style.display = "none";
      document.querySelector("#header-register").style.display = "none";
      document.querySelector("#header-profile").href = "/u/0/admin";
      document.querySelector(".header-username").innerText = "Admin";
      document.querySelector("#header-group-link").href = "/groups/admin";
    } else if (this.props.user === "user"){
      document.querySelector("#header-login").style.display = "none";
      document.querySelector("#header-register").style.display = "none";
      document.querySelector("#header-profile").href = "/u/1";
      document.querySelector(".header-username").innerText = "User";
    } else {
      //Else, nobody logged in.
      document.querySelector("#header-profile").style.display = "none";
    }

  }

  render() {
    return (
      <div>
        <div className="headerbox">
          <a href="/">
            <div className="header-logo">
            </div>
          </a>
          <ul className="header-left-ul">
            <a href="/">
              <li className="header-li">
                <div className="li-content">
                  Home <i className="fa fa-home"></i>
                </div>
              </li>
            </a>
            <a href="/groups" id="header-group-link">
              <li className="header-li">
                  <div className="li-content">
                    Groups <i className="fa fa-users"></i>
                  </div>
              </li>
            </a>
          </ul>
          {/* register and login buttons should be removed from header when a user logs in.
            Will implement in phase 2 once we have server functionality that knows when a user is logged in*/}
          <ul className="header-right-ul" >
            <a href="/register" id="header-register">
              <li className="header-li">
                <div className="li-content" >
                  Register <i className="fa fa-user-plus"></i>
                </div>
              </li>
            </a>
            <a href="/login" id="header-login">
              <li className="header-li">
                <div className="li-content" >
                  Login <i className="fa fa-sign-in"></i>
                </div>
              </li>
            </a>
            <a href="/u/1" id="header-profile"> 
            {/* currently hard-coded to go to the profile page of user id 1.
            Will later have server call to link to the profile of a currently logged in user. */}
              <li className="header-li">
                  <div className="li-content">
                    <span className="header-username">Profile</span> <i className="fa fa-user"></i>
                  </div>
              </li>
            </a>
            <a href="/logout" id="header-logout"> 
              <li className="header-li">
                  <div className="li-content">
                    <span className="header-username">Logout</span> <i className="fa fa-sign-out"></i>
                  </div>
              </li>
            </a>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header