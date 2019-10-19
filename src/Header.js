import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="headerbox">
          <div className="header-logo">
          </div>
          <ul className="header-left-ul">
            <li className="header-li">
              <div className="li-content">
                Home
              </div>
            </li>
            <li className="header-li">
              <div className="li-content">
                Groups
              </div>
            </li>
          </ul>
          <ul className="header-right-ul">
            <li className="header-li">
              <div className="li-content">
                Register
              </div>
            </li>
            <li className="header-li">
              <div className="li-content">
                Login
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header