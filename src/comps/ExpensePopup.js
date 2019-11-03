import React from 'react';
import ReactDOM from 'react-dom';
import NewGroupMemberRow from '../comps/NewGroupMemberRow';
import '../style/ExpensePopup.css';
import { uid } from 'react-uid';
import Helper from  '../scripts/helper.js';

class ExpensePopup extends React.Component {

  constructor(props){
    super(props);
    this.createNewMemberRow = this.createNewMemberRow.bind(this)
  }

  state = {
    expenseTitle: "",
    expenseContent: "",
    expenseCost: "",
    expenseMembers: "",
    numMembers: 1
  }

  /**
   * Creates a new expense based on the input fields and adds it to the group timeline.
   */
  createExpense = () => {
    if (this.state.expenseTitle === "" || this.state.expenseCost === "" || this.state.expenseContent === "" || this.getMembers().length === 1){
      alert("one or more fields is missing!");
      return;
    }
    const m = {
      "id": 8,
      "groupId": 0,
      "date": (new Date()).getTime() / 1000,
      "type": "expense",
      "expense": {
        "id": 0,
        "title": this.state.expenseTitle,
        "cost": Number(this.state.expenseCost).toFixed(2),
        "remaining": Number(this.state.expenseCost).toFixed(2) - (this.state.expenseCost / this.getMembers().length),
        "members": this.getMembers()
      },
      //code below requires a server call to obtain the currently logged in user
      //hard-coded to always assume "user" created the expense
      "user": {
        "id": 1,
        "username": "user",
        "password": "123",
        "picUrl": "https://api.adorable.io/avatars/200/1",
        "email": "dummy@dummy.com",
        "firstName": "Firstname",
        "lastName": "McLastname",
        "paypal": "https://www.paypal.me/chrismarcok",
        "preference": "paypal",
        "description": "send me money please thank u :)"
      },
      "content": this.state.expenseContent
    }
    if (this.props.admin === true){
      m.user.id = 0;
      m.user.username = "admin";
      m.user.picUrl = "https://api.adorable.io/avatars/200/0";
    }
    m.id = uid(m);
    m.expense.id = uid(m);

    this.props.addExpense(m);
    this.props.closePopup();
  }

  /**
   * Returns an array of all the members of an expense.
   */
  getMembers(){
    const usernameInputs = document.querySelectorAll(".group-member-input-field");
    const memberLst = this.props.group.members;
    const numMembers = this.state.numMembers;
    const added = [];
    //code below requires a server call to obtain the currently logged in user to add the new expense's member list
    //hard-coded to always add "user" to the member list
    const result = [{
      "id": 1,
      "username": "user",
      "password": "123",
      "picUrl": "https://api.adorable.io/avatars/200/1",
      "email": "dummy@dummy.com",
      "firstName": "Firstname",
      "lastName": "McLastname",
      "paypal": "https://www.paypal.me/chrismarcok",
      "preference": "paypal",
      "description": "send me money please thank u :)",
      "paid": true
    }];
    if (this.props.admin === true){
      result[0].id = 0;
      result[0].username = "admin";
      result[0].picUrl = "https://api.adorable.io/avatars/200/0";
    }
    for (let i = 0; i < numMembers; i++){
      const m = memberLst.filter( m => 
        m.username === usernameInputs[i].value
      );

      if (m.length === 0 || added.includes(m[0].id)){
        continue;
      }
      result.push(m[0]);
      added.push(m[0].id);
    }
    return result;
  }

  /**
   * Formats the cost input of the expense to include decimals.
   */
  formatCost(){
    const costInputField = document.querySelector("#expenseCostInput");
    const val = document.querySelector("#expenseCostInput").value;
    costInputField.value = Number(val).toFixed(2);
    if (Number(val) < 0){
      costInputField.value = Number(0).toFixed(2);
    }
  }

  /**
   * Closes the expense popup.
   */
  close(e, closeFunction){
    if (e.target.className === "popup" || e.target.className === "popup-close-btn"){
      closeFunction();
    }
  }

  /**
   * Adds a new member row to the expense popup.
   */
  createNewMemberRow(){
    const newDiv = document.createElement("div");
    newDiv.className = "new-member-expense-popup-id-" + this.state.numMembers;
    document.querySelector(".newGroupMemberRow-spawn-here").appendChild(newDiv);
    ReactDOM.render(<NewGroupMemberRow newRow={this.createNewMemberRow} num={( this.state.numMembers + 1)} groupId={this.props.group.id}/>, document.querySelector(".new-member-expense-popup-id-" + this.state.numMembers));
    this.setState({
      numMembers: this.state.numMembers + 1
    });
  }


  render() {
    return (
      <div className='popup' onPointerDown={(e) => this.close(e, this.props.closePopup)}>
        <div className='popup_inner'>
          <h1>New Expense</h1>
          <form className="new-expense-form">
              <h3>
                Expense Title
              </h3>
              <input className="new-expense-form-input" id="expenseTitleInput" type="text" name="expenseTitle" placeholder="Title" onChange={Helper.handleInputChange.bind(this)}></input>
              <h3>
                Content 
              </h3>
              <input className="new-expense-form-input" id="expenseContentInput" type="text" name="expenseContent" placeholder="A Message About Your Expense" onChange={Helper.handleInputChange.bind(this)}></input>
              <h3>
                Cost 
              </h3>
              <input className="new-expense-form-input" id="expenseCostInput" type="number" name="expenseCost" placeholder="Ex. '9.99'" min="0" onChange={Helper.handleInputChange.bind(this)} onBlur={this.formatCost}></input>
              <h3>
                Members
              </h3>
              <NewGroupMemberRow num={1} newRow={this.createNewMemberRow} groupId={this.props.group.id}/>
              <div className="newGroupMemberRow-spawn-here">
              </div>
            </form>
          <div className="popup-btn-container">
            <button className="popup-create-btn" onClick={() => this.createExpense()}> Create Expense </button>
            <button className="popup-close-btn" onClick={(e) => this.close(e, this.props.closePopup)}> Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpensePopup;