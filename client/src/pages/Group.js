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
import Helper from '../scripts/helper.js';
import ExpensePopup from '../comps/ExpensePopup.js'
import Axios from 'axios';

/* This is the actual group page. the group page that has 3 columns*/

class Group extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      id: this.getGroupID(),
      thisGroup: undefined,
      user: undefined,
      groupTitle: "Loading...",
      groupInput: "",
      showPopup: false,
      groupMemberAddInput: "",
      addingMember: false,


      //Stuff to load
      loadingMe: true,
      groupMembers: [],
      loadingMembers: true,
      groupMessages: [],
      loadingMessages: true,
      otherGroups: [],
      loadingOtherGroups: true,
    }
    this.getInput = this.getInput.bind(this);
    this.addMember = this.addMember.bind(this);
    this.toggleAddUser = this.toggleAddUser.bind(this);
  }

  componentDidMount() {
    //Find this group
    Axios.get(`/api/g/${this.state.id}`)
    .then( response => {
      this.setState({
        thisGroup: response.data,
        groupTitle: response.data.name,
      })
    })
    .catch( err => console.log(err));

    //Load Members
    Axios.get(`/api/membersOf/${this.state.id}`)
    .then( response => {
      this.setState({
        groupMembers: response.data,
        loadingMembers: false,
      });
      console.log(response.data);
    })
    .catch(err => console.log(err));

    //Load Messages
    Axios.get(`/api/gm/${this.state.id}`)
    .then(response => {
      this.setState({
        groupMessages: response.data,
        loadingMessages: false,
      });
      this.scrollToBottomOfChat();
    })
    .catch( err => console.log(err));

    //Load OtherGroups
    Axios.get(`/api/groupsExcept/${this.state.id}`)
    .then( response => {
      this.setState({
        otherGroups: response.data,
        loadingOtherGroups: false,
      });
    })
    .catch( err => console.log(err));

    //Get logged in user
    Axios.get(`/api/me`)
    .then( response => {
      this.setState({
        user: response.data,
        loadingMe: false,
      });
    })
    .catch( err => console.log(err));
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
   * Return this group's 24 Hex ID.
   */
  getGroupID(){
    const { group_number } = this.props.match.params;
    return group_number
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
        groupID: this.state.id,
        isMsg: true,
        creatorID: this.state.user._id,
        content: val,
        expense: {},
      }
      
      //Reset the state, and make textbox empty
      document.querySelector("#group-input").value = ""
      this.setState({
        "groupInput": ""
      });

      //Make the post
      Axios.post(`/g/${this.state.id}`,
      JSON.stringify(m),
      { headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
      .then( response => {
        console.log("Posted message to group");
        m.id = response.data._id;
        m.date = response.data.date;
        const newMsg = document.createElement("div")
        newMsg.className = "newmsg-" + m.id
        document.querySelector(".group-main-content").appendChild(newMsg)
        ReactDOM.render(<GroupMessage 
                                      admin={ this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id)}
                                      user={ this.state.user } 
                                      msg={ m } 
                                      key={ m.id } />, 
                                      document.querySelector(".newmsg-" + m.id))
      })
      .catch( err => console.log(err));
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

    //No group exists with this id. redirect to 404 page.
    // if (group === undefined) {
    //   return <Redirect to='/404' />
    // }
    const {groupMembers, groupMessages, otherGroups} = this.state;
    return (
      <div>
        <Header user="admin"/>
        <div className="group-container">
          <div className="group-col group-members-col">
            <div className="group-members-div">
              <div className="group-generated-members">
              {
                this.state.loadingMembers ? "Loading Members..."  :
                groupMembers.map(member => {
                  return (
                    <GroupMember member={ member } key={ member._id } />
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
                {this.state.groupTitle}
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
                this.state.loadingMessages || this.state.loadingMe ? "Loading Messages..." :
                groupMessages.map(msg => {
                  return (
                    <GroupMessage 
                    msg={msg} 
                    key={ msg._id } 
                    user={this.state.user}
                    update={this.updateSmallExpense} 
                    hideExpense={this.hideSmallExpense} 
                    admin={this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id)} />
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
                  this.state.loadingMessages ? "Loading Expenses..." :
                  groupMessages.filter(msg => !msg.isMsg).map(msg => {
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
                this.state.loadingOtherGroups ? "Loading Other Groups..." : 
                /* Get all groups but current one*/
                otherGroups.map(g => {
                  return (
                    <OtherGroupComp group={g} key={g._id} />
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