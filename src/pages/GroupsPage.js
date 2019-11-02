import React from 'react'
import Header from '../comps/Header.js'
import GroupComp from '../comps/GroupComp.js'
import dummy_group_list from './dummy_group_list.json'
import { uid } from 'react-uid'

import NewGroupPopup from '../comps/NewGroupPopup.js'

class GroupsPage extends React.Component {

  groups = this.fetchGroups()

  constructor(props){
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  openPopup() {
    if(this.state.showPopup == false){
      this.setState({
        showPopup: true
      });
    }
  }

  closePopup() {
    if(this.state.showPopup == true){
      this.setState({
        showPopup: false
      });
    }
  }

  fetchGroups() {
    //here is where we would get stuff from a server
    return dummy_group_list
  }

  render() {
    return (
      <div>
        <Header/>
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
          
          <div className="group-div">
            <div className="group-add-btn" onClick={this.openPopup.bind(this)}>
              <div className="group-add-icon-container">
                <i className="fa fa-plus"></i>
                {this.state.showPopup ? 
                  <NewGroupPopup closePopup={this.closePopup.bind(this)}/>
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