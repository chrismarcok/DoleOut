import React from 'react';
import ReactDOM from 'react-dom';
import NewGroupMemberRow from '../comps/NewGroupMemberRow';
import '../style/ExpensePopup.css';
import { uid } from 'react-uid';

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

  createExpense = () => {
    if (this.state.expenseTitle === "" || this.state.expenseCost === "" || this.state.expenseContent === ""){
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
        "cost": this.formatNum(this.state.expenseCost),
        "remaining": this.formatNum(this.state.expenseCost),
        "members": [
          {
            "id": 12,
            "username": "george",
            "password": "123",
            "picUrl": "https://api.adorable.io/avatars/200/12",
            "email": "dummy@dummy.com",
            "firstName": "Firstname",
            "lastName": "McLastname"
          },
          {
            "id": 19,
            "username": "grace",
            "password": "123",
            "picUrl": "https://api.adorable.io/avatars/200/19",
            "email": "dummy@dummy.com",
            "firstName": "Firstname",
            "lastName": "McLastname"
          },
          {
            "id": 17,
            "username": "donald",
            "password": "123",
            "picUrl": "https://api.adorable.io/avatars/200/17",
            "email": "dummy@dummy.com",
            "firstName": "Firstname",
            "lastName": "McLastname"
          }
        ]
      },
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
    m.id = uid(m);
    m.expense.id = uid(m);
    this.props.addExpense(m);
    this.props.closePopup();
}

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  formatNum(n){
    return Number(n).toFixed(2);
  }

  formatCost(){
    const costInputField = document.querySelector("#expenseCostInput");
    const val = document.querySelector("#expenseCostInput").value;
    costInputField.value = Number(val).toFixed(2);
    if (Number(val) < 0){
      costInputField.value = Number(0).toFixed(2);
    }
  }

  close(e, closeFunction){
    if (e.target.className === "popup" || e.target.className === "popup-close-btn"){
      closeFunction();
    }
  }

  createNewMemberRow(){
    const newDiv = document.createElement("div");
    newDiv.className = "new-member-expense-popup-id-" + this.state.numMembers;
    document.querySelector(".newGroupMemberRow-spawn-here").appendChild(newDiv);
    ReactDOM.render(<NewGroupMemberRow newRow={this.createNewMemberRow} num={( this.state.numMembers + 1)} />, document.querySelector(".new-member-expense-popup-id-" + this.state.numMembers));
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
              <input className="new-expense-form-input" id="expenseTitleInput" type="text" name="expenseTitle" placeholder="Title" onChange={this.handleInputChange}></input>
              <h3>
                Content 
              </h3>
              <input className="new-expense-form-input" id="expenseContentInput" type="text" name="expenseContent" placeholder="A Message About Your Expense" onChange={this.handleInputChange}></input>
              <h3>
                Cost 
              </h3>
              <input className="new-expense-form-input" id="expenseCostInput" type="number" name="expenseCost" placeholder="Ex. '9.99'" min="0" onChange={this.handleInputChange} onBlur={this.formatCost}></input>
              <h3>
                Members
              </h3>
              <NewGroupMemberRow num={1} newRow={this.createNewMemberRow}/>
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