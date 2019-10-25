import React from 'react'
import Header from '../comps/Header'
import dummy_group_list from './dummy_group_list.json'
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
    console.log(val)
    
    //Reset the state, and make textbox empty
    document.querySelector("#group-input").value = ""
    this.setState({
      "groupInput": ""
    })
  }

  render() {
    const group = this.getGroup()
    const groups = this.fetchGroups()

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
                      <GroupMember name={member} key={ uid(member) }/>
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
              Nothing is here
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