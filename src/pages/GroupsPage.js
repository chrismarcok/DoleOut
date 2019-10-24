import React from 'react'
import Header from '../comps/Header.js'
import Group from '../comps/Group.js'
import dummy_group_list from './dummy_group_list.json'
import { uid } from 'react-uid'

class GroupsPage extends React.Component {

  groups = this.fetchGroups()

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
                <Group key={ uid(group) }
                       name={ group.name }
                       icon={ group.icon }
                       colorBg={ group.colorBg }
                       id={ group.id }
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default GroupsPage