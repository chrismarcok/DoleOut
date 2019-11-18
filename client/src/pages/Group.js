/**
 * This is the group page from the ADMIN perspective (as opposed to the user's).
 *  The user cannot delete users or messages. The admin can.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../comps/Header';
import OtherExpense from '../comps/OtherExpense';
import GroupMessage from '../comps/GroupMessage';
import GroupMember from '../comps/GroupMember';
import OtherGroupComp from '../comps/OtherGroupComp';
import { uid } from 'react-uid';
import Helper from '../scripts/helper';
import ExpensePopup from '../comps/ExpensePopup'
import Loader from '../comps/Loader'
import Axios from 'axios';
import '../style/Loader.css';

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
      usersOfMessages: undefined,
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
      });
    })
    .catch( err => {
      console.log(err);
      window.location = '/403';
    });

    //Load Members
    Axios.get(`/api/membersOf/${this.state.id}`)
    .then( response => {
      this.setState({
        groupMembers: response.data,
        loadingMembers: false,
      });  
    })
    .catch( err => {
      console.log(err);
      window.location = '/403';
    });

    //Load Messages
    Axios.get(`/api/gm/${this.state.id}`)
    .then(response => {
      const values = Object.values(response.data);
      const messages = values.filter( val => val.hasOwnProperty('creatorID'));
      this.setState({
        groupMessages: messages,
        usersOfMessages: response.data,
        loadingMessages: false,
      },
      () => {
        setTimeout(() => {
        //Scroll to the bottom after state has changed. Doesnt work with slow connections
        this.scrollToBottomOfChat();
      }, 500)
      });
    })
    .catch( err => {
      console.log(err);
      //window.location = '/403';
    });

    //Load OtherGroups
    Axios.get(`/api/groupsExcept/${this.state.id}`)
    .then( response => {

        this.setState({
          otherGroups: response.data,
          loadingOtherGroups: false,
        });

    })
    .catch( err => {
      console.log(err);
      window.location = '/403';
    });

    //Get logged in user
    Axios.get(`/api/me`)
    .then( response => {
      this.setState({
        user: response.data,
        loadingMe: false,
      });
    })
    .catch( err => {
      console.log(err);
      window.location = '/403';
    });
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
    // const e = {
    //     groupID: this.state.id,
    //     isMsg: false,
    //     creatorID: this.state.user._id,
    //     content: "",
    //     expense: 
    //     {
    //       title: "title",
    //       cost: 9.99,
    //       totalRemaining: 9.99,
    //       totalPaid: 0,
    //       members: [{
    //         _id: '5dce590a55cd6a2804e199e0',
    //         displayName: 'user',
    //         amountPaid: 0,
    //         totalToPay: 9.99,
    //         avatarURL: 'https://i.imgur.com/L58c7ZD.jpg',
    //         complete: false,
    //       }],
    //     },
    // };
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
        expense: undefined,
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
        //console.log(response.data);
        m._id = response.data._id;
        m.date = response.data.date;
        const newMsg = document.createElement("div")
        newMsg.className = "newmsg-" + m._id
        document.querySelector(".group-main-content").appendChild(newMsg);
        ReactDOM.render(<GroupMessage 
                                      admin={ this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id) || this.state.user._id === m.creatorID }
                                      user={ this.state.user } 
                                      creator={this.state.user}
                                      msg={ m } 
                                      key={ m._id } />, 
                                      document.querySelector(".newmsg-" + m._id));
        this.scrollToBottomOfChat();
      })
      .catch( err => console.log(err));
      
    }
  }

  /**
   * Adds a new user to the group's member list.
   */
  addMember(e){
    //if click button or hit enter key
    let addedUser = undefined;
    if (e.target.id === "group-add-member-accept-btn" || e.keyCode === 13){
      //Must re-get current group data, incase member list has changed.
      Axios.get(`/api/g/${this.state.id}`)
      .then( response => {
        this.setState({
          thisGroup: response.data,
        });
        return Axios.get(`/api/username/${this.state.groupMemberAddInput}`);
      })
      .then( response => {
        addedUser = response.data;
        if (!this.state.thisGroup.memberIDs.includes(addedUser._id)){
          return Axios.post(`/g/${this.state.thisGroup._id}/user/${this.state.groupMemberAddInput}`);
        } else {
          throw new Error("That user is already in this group");
        }
      })
      .then( response => {
        const newDiv = document.createElement("div");
        newDiv.className = `group-member-${addedUser._id}`;
        document.querySelector(".group-generated-members").appendChild(newDiv);
        ReactDOM.render(<GroupMember 
          member={addedUser} 
          group={this.state.thisGroup} 
          admin={this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id)}
          isSuper={ false }/>,   
          document.querySelector(`.group-member-${addedUser._id}`));
      })
      .catch( err => console.log(err))
      .finally( () => {
        document.querySelector("#group-add-member-input").value = "";
      });
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
    const {groupMembers, groupMessages, otherGroups} = this.state;
    const {loadingMe, loadingMembers, loadingMessages, loadingOtherGroups} = this.state;
    return (
      <div>
        <Header user="admin"/>
        {
        (loadingMe || loadingMembers || loadingMessages || loadingOtherGroups) ?
          <Loader /> : null
        }
        <div className="group-container">
          <div className="group-col group-members-col">
            <div className="group-members-div">
              <div className="group-generated-members">
              {
                (this.state.loadingMembers || this.state.loadingMe) ? "Loading Members..."  :
                groupMembers.map(member => {
                  return (
                    <GroupMember 
                      member={ member } 
                      key={ member._id } 
                      isSuper = { this.state.thisGroup.superusers.includes(member._id) } 
                      group={ this.state.thisGroup }
                      admin={ this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id) }/>
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
                  <ExpensePopup 
                    addExpense={ this.createExpense } 
                    closePopup={ this.togglePopup.bind(this) } 
                    group={ this.state.thisGroup } 
                    admin={  this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id) }/>
                  : null}
              </div>
              
            </div>
            <div className="group-main-content">
              {
                this.state.loadingMessages || this.state.loadingMe ? "Loading Messages..." :
                groupMessages.map(msg => {
                  return (
                    <GroupMessage 
                    msg={ msg } 
                    key={ msg._id } 
                    user={ this.state.user }
                    creator={ this.state.usersOfMessages[msg.creatorID] }
                    update={ this.updateSmallExpense } 
                    hideExpense={ this.hideSmallExpense } 
                    admin={ this.state.user.isAdmin || this.state.thisGroup.superusers.includes(this.state.user._id) || this.state.user._id === msg.creatorID} />
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
                      <div key={ msg._id } onClick={(e) => this.scrollToExpense(e, msg)}>
                        <OtherExpense msg={ msg } avatarURL={ this.state.usersOfMessages[msg.creatorID].avatarURL } />
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
                otherGroups.map(g => {
                  return (
                    <OtherGroupComp group={ g } key={ g._id } />
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