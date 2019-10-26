import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../comps/Header'
import GroupMessage from '../comps/GroupMessage'
import dummy_group_list from './dummy_group_list.json'
import dummy_group_msgs from './dummy_group_msgs.json'
import GroupMember from '../comps/GroupMember'
import OtherGroupComp from '../comps/OtherGroupComp'
import { uid } from 'react-uid'
import { Redirect } from 'react-router-dom'

/* This is the actual group page. the group page that has 3 columns*/

class Group extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      groupInput: "",
    }
    this.getInput = this.getInput.bind(this)
  }

  fetchGroups() {
    //here is where we would get stuff from a server
    return dummy_group_list
  }

  fetchGroupMsgs(){
    return dummy_group_msgs
  }

  getGroup(){
    const { group_number } = this.props.match.params
    const groups = this.fetchGroups()
    const thisGroupLst = groups.filter( g => g.id === parseInt(group_number))
    return thisGroupLst[0]
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    })
    // console.log(this.state)
  }

  getInput(){
    const val = this.state.groupInput
    if (val === ""){
      return
    }

    const m = {
      "id": 123,
      "groupId": this.getGroup().id,
      "date": 102,
      "user":   
        {
          "id": 1,
          "username": "user",
          "password": "user",
          "picUrl": "https://api.adorable.io/avatars/200/1",
          "email": "dummy@dummy.com",
          "firstName": "Firstname",
          "lastName": "McLastname"
        },
      "content": val
    }
    m.id = uid( m )
    const newMsg = document.createElement("div")
    newMsg.id = m.id
    document.querySelector(".group-main-content").appendChild(newMsg)
    console.log(m)
    ReactDOM.render(<GroupMessage msg={ m } key={ m.id }/>, document.querySelector("#" + m.id))
    
    //Reset the state, and make textbox empty
    document.querySelector("#group-input").value = ""
    this.setState({
      "groupInput": ""
    })
  }


  render() {
    const group = this.getGroup()
    const groups = this.fetchGroups()
    const msgs = this.fetchGroupMsgs()

    //No group exists with this id. redirect to 404 page.
    if (group === undefined){
      return <Redirect to='/404'/>
    }
    
    return (
      <div>
        <Header/>
        <div className="group-container">
            <div className="group-col group-members-col">
              <ul className="group-members-ul">
                {
                  group.members.map( member => {
                    return (
                      <GroupMember member={member} key={ uid(member) } />
                    )
                  })
                }
              </ul>
            </div>
          
          <div className="group-col group-main-col">
            <div>
              <div className="group-title">
                {group.name}
              </div>
              <div className="group-main-add-btn">
                <i className="fa fa-plus"></i> New Expense
              </div>
            </div>
            <div className="group-main-content">
              {
                msgs.filter(m => m.groupId === group.id).map(msg => {
                  return (
                    <GroupMessage msg={ msg } key={ uid(msg) }/>
                  )
                })
              }
                
            </div>
            <div className="group-input-container">
              <input id="group-input" type="text" name="groupInput" placeholder="Type something..." onChange={this.handleInputChange} maxLength="255"></input>
              <div className="group-main-send-btn" onClick={this.getInput}><i className="fa fa-paper-plane"></i></div>
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
                    <OtherGroupComp group={ g } key={ uid(g) }/>
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