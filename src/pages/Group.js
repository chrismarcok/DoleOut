import React from 'react'
import Header from '../comps/Header'
import dummy_group_list from './dummy_group_list.json'
import GroupMember from '../comps/GroupMember'
import OtherGroupComp from '../comps/OtherGroupComp'

class Group extends React.Component {


  fetchGroups() {
    //here is where we would get stuff from a server
    return dummy_group_list
  }

  getGroup(){
    const { group_number } = this.props.match.params
    const groups = this.fetchGroups()
    const thisGroupLst = groups.filter( g => g.id === parseInt(group_number))
    return thisGroupLst[0]
  }


  render() {
    const group = this.getGroup()
    const groups = this.fetchGroups()
    
    return (
      <div>
        <Header/>
        <div className="group-container">
          <div className="group-col group-members-col">
            <ul className="group-members-ul">
              {
                group.members.map( member => {
                  return (
                    <GroupMember name={member}/>
                  )
                })
              }
            </ul>
          </div>
          <div className="group-col group-main-col">
            <div className="group-title">
              {group.name}
            </div>
          </div>
          <div className="group-col group-other-col">
            <div className="other-title">
              <h3>Other Groups</h3>
            </div>
            <ul className="group-col-other-ul">
              {
                /* Get all groups but current one*/
                groups.filter(g => g.id !== group.id).map( g => {
                  return (
                    <OtherGroupComp group={ g }/>
                  )
                }) 
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Group