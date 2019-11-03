import React from 'react';

class Header extends React.Component {
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
            <a href="/groups">
              <li className="header-li">
                  <div className="li-content">
                    Groups <i className="fa fa-users"></i>
                  </div>
              </li>
            </a>
          </ul>
          {/* register and login buttons should be removed from header when a user logs in.
            Will implement in phase 2 once we have server functionality that knows whether a user is logged in*/}
          <ul className="header-right-ul">
            <a href="/register">
              <li className="header-li">
                <div className="li-content">
                  Register <i className="fa fa-user-plus"></i>
                </div>
              </li>
            </a>
            <a href="/login">
              <li className="header-li">
                <div className="li-content">
                  Login <i className="fa fa-sign-in"></i>
                </div>
              </li>
            </a>
            <a href="/u/1"> 
            {/* currently hard-coded to go to the profile page of user id 1.
            Will later have server call to link to the profile of a currently logged in user. */}
              <li className="header-li">
                  <div className="li-content">
                    Profile <i className="fa fa-user"></i>
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