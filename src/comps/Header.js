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
          </ul>
        </div>
      </div>
    )
  }
}

export default Header