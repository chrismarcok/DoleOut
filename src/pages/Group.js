/**
 * This is the group page from the ADMIN perspective (as opposed to the user's).
 *  The user cannot delete users or messages. The admin can.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../comps/Header';
import OtherExpense from '../comps/OtherExpense';
import GroupMessage from '../comps/GroupMessage';
import Fetch from '../scripts/fetch.js';
import GroupMember from '../comps/GroupMember';
import OtherGroupComp from '../comps/OtherGroupComp';
import { uid } from 'react-uid';
import { Redirect } from 'react-router-dom';
import Helper from '../scripts/helper.js';
import ExpensePopup from '../comps/ExpensePopup.js'

/* This is the actual group page. the group page that has 3 columns*/

class Group extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      groupInput: "",
      showPopup: false,
      groupMemberAddInput: "",
      addingMember: false
    }
    this.getInput = this.getInput.bind(this);
    this.addMember = this.addMember.bind(this);
    this.toggleAddUser = this.toggleAddUser.bind(this);
  }

  componentDidMount() {
    const group = this.getGroup();
    if (group !== undefined){
      this.scrollToBottomOfChat();
    }
  }

  /**
   * Toggles whether or not the expense popup is showing
   */
  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  /**
   * Scrolls to the bottom of the chat. Called when the component mounts.
   */
  scrollToBottomOfChat() {
    const msgBox = document.querySelector(".group-main-content");
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  /**
   * Return the group object that has this group number.
   */
  getGroup() {
    const { group_number } = this.props.match.params;
    const groups = Fetch.fetchGroups()
    const thisGroupLst = groups.filter(g => g.id === parseInt(group_number))
    return thisGroupLst[0]
  }

  /**
   * Creates an new expense and adds it to the group timeline and sidebar.
   * This method is passed on as a prop to the create new expense popup.
   * Would need a server call to update our database with the new expense.
   */
  createExpense = (expense) => {
    const newMsg = document.createElement("div")
    newMsg.id = expense.id
    document.querySelector(".group-main-content").appendChild(newMsg)
    ReactDOM.render(<GroupMessage msg={expense} key={expense.id} update={this.updateSmallExpense} hideExpense={this.hideSmallExpense} admin={true}/>, document.querySelector("#" + expense.id))
    this.scrollToBottomOfChat();

    // Create the small expense in the sidebar.
    const newSmallExpense = (
      <div key={uid(expense)} onClick={(e) => this.scrollToExpense(e, expense)}>
        <OtherExpense msg={expense} />
      </div>
    )
    const newDiv = document.createElement("div");
    newDiv.className = uid(expense);
    document.querySelector(".group-col-other-ul").appendChild(newDiv);
    ReactDOM.render(newSmallExpense, document.querySelector("." + uid(expense)));
    
  }

  /**
   * Creates a new chat message and adds it to the group timeline based on the chat input field.
   * Would need a server call to update our database with the new chat, as well as obtain the current logged in user.
   */
  getInput(e) {
    const val = this.state.groupInput;
    if ((e.keyCode === 13 || e.target === document.querySelector(".group-main-send-btn") || e.target === document.querySelector(".fa-paper-plane")) && val !== "") {
      //Here we would need to get the current user object from a server. for now, just use this dummy user.
      const m = {
        "id": 123,
        "groupId": this.getGroup().id,
        "date": (new Date()).getTime() / 1000,
        "type": "msg",
        "user":
        {
          "id": 0,
          "username": "admin",
          "password": "admin",
          "picUrl": "https://api.adorable.io/avatars/200/0",
          "email": "dummy@dummy.com",
          "firstName": "Firstname",
          "lastName": "McLastname"
        },
        "content": val
      }
      m.id = uid(m);
      const newMsg = document.createElement("div")
      newMsg.id = m.id
      document.querySelector(".group-main-content").appendChild(newMsg)
      
      ReactDOM.render(<GroupMessage msg={m} key={m.id} admin={true}/>, document.querySelector("#" + m.id))

      //Reset the state, and make textbox empty
      document.querySelector("#group-input").value = ""
      this.setState({
        "groupInput": ""
      })
      this.scrollToBottomOfChat();
    }
  }

  /**
   * Adds a new user to the group's member list.
   * Would need a server call to update the group's new member in our database.
   */
  addMember(e){
    //button or enter key
    if (e.target.id === "group-add-member-accept-btn" || e.keyCode === 13){
      const users = Fetch.fetchUsers();
      const usersFiltered = users.filter( u => u.username === this.state.groupMemberAddInput);
      if (usersFiltered.length === 0){
        alert("no user by that username")
        return;
      }
      const groupMembers = this.getGroup().members;
      const usersInGroupWithSameUsername = groupMembers.filter( m => m.username === this.state.groupMemberAddInput);
      if (usersInGroupWithSameUsername.length !== 0){
        alert("that user is already in this group!");
        return;
      }
      else {
        // here we would make the server call to update our database
        const newDiv = document.createElement("div");
        const newDivClass = String(uid(usersFiltered[0]));
        newDiv.className =  newDivClass;
        document.querySelector(".group-generated-members").appendChild(newDiv);
        ReactDOM.render(<GroupMember member={usersFiltered[0]} admin={true}/>, document.querySelector("."+newDivClass));
        document.querySelector("#group-add-member-input").value = "";
      }
    }
  }

  /**
   * Toggles whether the add new user input field is displayed.
   */
  toggleAddUser(){
    const addUserInput = document.querySelector(".group-add-member-input-container");
    const addMemberCntr = document.querySelector(".group-add-member-container");
    if (!this.state.addingMember){
      addUserInput.style.display = "block";
      addMemberCntr.style.display = "none";
    }
    else {
      addUserInput.style.display = "none";
      addMemberCntr.style.display = "block";
    }
    this.setState({
      addingMember: !this.state.addingMember
    });
    
  }

  /**
   * Scrolls to the msg in question. Called when you click on the expense in the 
   * sidebar.
   */
  scrollToExpense(event, msg){
    const elem = document.querySelector("#group-main-profile-pic-id-" + msg.id);
    elem.scrollIntoView();
  }

  /**
   * Updates the expense in the sidebar.
   */
  updateSmallExpense(id, amount){
    const txt = document.querySelector(".expense-small-id-" + id + " p");
    txt.innerText = `$${amount} remaining`;
  }

  /**
   * Hides the expense in the sidebar. Called when an expense is finished paying.
   */
  hideSmallExpense(id){
    document.querySelector(".expense-small-id-" + id).style.display = "none";
  }

  render() {
    const group = this.getGroup()
    const groups = Fetch.fetchGroups()
    const msgs = Fetch.fetchGroupMsgs()

    //No group exists with this id. redirect to 404 page.
    if (group === undefined) {
      return <Redirect to='/404' />
    }

    return (
      <div>
        <Header user="admin"/>
        <div className="group-container">
          <div className="group-col group-members-col">
            <div className="group-members-div">
              <div className="group-generated-members">
              {
                group.members.map(member => {
                  return (
                    <GroupMember member={member} key={uid(member)} admin={true} />
                  )
                })
              }
              </div>
              <div className="group-add-member-container">
                <div className="group-add-member-inner" onClick={this.toggleAddUser}>
                  <div className="group-add-member-btn" >
                    <i className="fa fa-plus"></i>
                  </div>
                </div>
              </div>
              
              <div className="group-add-member-input-container">
                
                <input id="group-add-member-input" type="text" name="groupMemberAddInput" placeholder="Enter Username" onChange={Helper.handleInputChange.bind(this)} maxLength="150" onKeyDown={this.addMember}></input>
                
                <i className="fa fa-check" id="group-add-member-accept-btn" onClick={this.addMember}></i>
                <div className="group-add-member-cancel-btn" onClick={this.toggleAddUser}> Cancel </div>
              </div>
              
            </div>
          </div>

          <div className="group-col group-main-col">
            <div>
              <div className="group-title">
                {group.name}
              </div>

              <div className="group-main-add-btn">
                <button onClick={this.togglePopup.bind(this)}> <i className="fa fa-plus"></i> New Expense</button>
                {this.state.showPopup ? 
                  <ExpensePopup addExpense = {this.createExpense} closePopup={this.togglePopup.bind(this)} group={group} admin={true}/>
                  : null}
              </div>
              
            </div>
            <div className="group-main-content">
              {
                msgs.filter(m => m.groupId === group.id).map(msg => {
                  return (
                    <GroupMessage msg={msg} key={uid(msg)} update={this.updateSmallExpense} hideExpense={this.hideSmallExpense} admin={true}/>
                  )
                })
              }

            </div>
            <div className="group-input-container">
              <input id="group-input" type="text" name="groupInput" placeholder="Type something..." onChange={Helper.handleInputChange.bind(this)} maxLength="150" onKeyDown={this.getInput}></input>
              <div className="group-main-send-btn" onClick={this.getInput}><i className="fa fa-paper-plane"></i></div>
            </div>
          </div>
          <div className="group-col group-other-col">
            <div className="other-title-expenses">
              <div className="other-title">
                <h3>Current Expenses</h3>
              </div>
              <ul className="group-col-other-ul">
                {
                  msgs.filter(m => m.groupId === group.id && m.type === "expense").map(msg => {
                    return (
                      <div key={uid(msg)} onClick={(e) => this.scrollToExpense(e, msg)}>
                        <OtherExpense msg={msg} />
                      </div>
                    );
                  })
                }
              </ul>
            </div>
            <div className="other-title">
              <h3>Other Groups</h3>
            </div>
            <ul className="group-col-other-ul">
              {
                /* Get all groups but current one*/
                groups.filter(g => g.id !== group.id).map(g => {
                  return (
                    <OtherGroupComp group={g} key={uid(g)} admin={true} />
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