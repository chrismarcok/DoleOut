import React from 'react'
import ReactDOM from 'react-dom';
import Header from '../comps/Header.js'
import GroupComp from '../comps/GroupComp.js'
import Fetch from '../scripts/fetch.js';
import { uid } from 'react-uid'

import NewGroupPopup from '../comps/NewGroupPopup.js'

class GroupsPage extends React.Component {

  groups = Fetch.fetchGroups();

  constructor(props){
    super(props);
    this.state = { showPopup: false };
  }

  /**
   * Toggles whether the new group popup is seen.
   */
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  openPopup() {
    if(this.state.showPopup === false){
      this.setState({
        showPopup: true
      });
    }
  }

  closePopup() {
    if(this.state.showPopup === true){
      this.setState({
        showPopup: false
      });
    }
  }

  /**
   * Creates an new group and adds it to the groups page.
   * This method is passed on as a prop to the create new group popup.
   * Would need a server call to update our database with the new group.
   */
  createGroup = (group) => {
    const newDiv = document.createElement("div");
    newDiv.className = "new-group-" + uid(group);
    document.querySelector(".new-groups-div").appendChild(newDiv);
    ReactDOM.render(<GroupComp key={ uid(group) }
                          name={ group.name }
                          icon={ group.icon }
                          colorBg={ group.colorBg }
                          id={ uid(group) }
                          members={ group.members }
                      />, document.querySelector(".new-group-" + uid(group)));    
  }

  render() {
    return (
      <div>
        <Header user={"admin"}/>
        <ul className="group-ul">
          {
            this.groups.map( group => {
              return (
                  <GroupComp key={ uid(group) }
                        name={ group.name }
                        icon={ group.icon }
                        colorBg={ group.colorBg }
                        id={ group.id }
                        members={ group.members }
                  />
              )
            })
          }
          <div className="new-groups-div"> </div>
          <div className="group-div">
            <div className="group-add-btn" onClick={this.openPopup.bind(this)}>
              <div className="group-add-icon-container">
                <i className="fa fa-plus"></i>
                {this.state.showPopup ? 
                  <NewGroupPopup addGroup = {this.createGroup} closePopup={this.closePopup.bind(this)}/>
                  : null}
              </div>
              
            </div>
          </div>
        </ul>
      </div>
    )
  }
}

export default GroupsPage