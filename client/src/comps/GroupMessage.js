/**
  * A group message represents either a chat message, or an expense in the chat.
  */

import React from 'react'
import ExpensePic from '../comps/ExpensePic'
import Axios from 'axios'
import openSocket from "socket.io-client";

const socket = openSocket("https://doleout.herokuapp.com");  
// const socket = openSocket("http://localhost:5000");

class GroupMessage extends React.Component {
 constructor(props) {
  super(props)

  this.state = {
    totalPaid: (!this.props.msg.isMsg) ? this.props.msg.expense.totalPaid : undefined,
    user: this.props.user,
    currentUserId: 1,
    currentlyPaying: false,
    payAmount: "0.01",
    expenseRemaining: (!this.props.msg.isMsg) ? Number(this.props.msg.expense.totalRemaining).toFixed(2) : undefined,
    youOwe: (!this.props.msg.isMsg) ? this.getYouOwe() : 123,
  }
  this.toggleExpense = this.toggleExpense.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.deductPayment = this.deductPayment.bind(this);
  this.delete = this.delete.bind(this);
  }

  /**
   * Get the amount you owe to this expense. Return 0 if you arent part of this expense.
   */
  getYouOwe(){
    const expense = this.props.msg.expense;
    const members = expense.members;
    const filtered = members.filter(member => member._id === this.props.user._id);
    //If the user is part of the expense, length will be 1.
    if (filtered.length !== 1){
      return 0;
    }
    const currentUser = filtered[0];
    if (currentUser.complete){
      return 0;
    }
    return Number(currentUser.totalToPay - currentUser.amountPaid).toFixed(2);
  }

  componentDidMount() {
    const pic = document.querySelector("#group-main-profile-pic-id-" + this.props.msg._id);
    pic.style.backgroundImage = "url('" + this.props.creator.avatarURL + "')";

    if (this.props.admin === false){
      document.querySelector(".expense-delete-container-" + this.props.msg._id).style.display = "none";
    }
  }

  redirect() {
      window.location = "/u/" + this.state.user._id;
  }

  /**
   * Toggles whether or not the payment input element of an expense is displayed and editable.
   */
  toggleExpense(){
    if (!this.state.currentlyPaying){
      this.setState({
        currentlyPaying: true
      });
      document.querySelector(".expense-pay-btn" + this.props.msg._id ).style.display = "none";
      document.querySelector(".expense-close-btn" + this.props.msg._id ).style.display = "block";
      document.querySelector(".expense-payment-container" + this.props.msg._id ).style.display = "block";
    } else {
      this.setState({
        currentlyPaying: false
      });
      document.querySelector(".expense-close-btn" + this.props.msg._id ).style.display = "none";
      document.querySelector(".expense-pay-btn" + this.props.msg._id ).style.display = "block";
      document.querySelector(".expense-payment-container" + this.props.msg._id).style.display = "none";
    }
  }

  handleInput(){
    this.setState(
      {    
        payAmount: document.querySelector("#paymentInput" + this.props.msg.id).value
      }
    );
  }

  /**
   * Reduces the remaining cost of an expense depending on what a user inputs in the expense's payment input field.
   * Will require a server call to edit an expense's information in our database.
   */
  deductPayment(){
    if(Number(this.state.payAmount) < 0){
      alert("Cannot pay a negative amount");
      return;
    }
    const amount = this.state.expenseRemaining - Number(this.state.payAmount)
    let rounded = parseFloat(Math.round(amount * 100) / 100).toFixed(2);
    if (rounded < 0.01){
      rounded = Number(0).toFixed(2);
      const closebtn = document.querySelector(".expense-close-btn" + this.props.msg.id);
      const container = document.querySelector(".expense-payment-container" + this.props.msg.id);
      closebtn.style.display = "none";
      container.style.display = "none";
      this.props.hideExpense(this.props.msg.id);
      document.querySelector(".expense-cover-" + this.props.msg.id).style.display = "block";
    }
    let youOweNewAmt = Number(this.state.youOwe - Number(this.state.payAmount)).toFixed(2);
    if (youOweNewAmt < 0){
      youOweNewAmt = Number(0).toFixed(2);
      alert("You paid more than required. The max amount has been paid instead.")
    }
    this.setState({
      expenseRemaining: rounded,
      youOwe: youOweNewAmt
    });
    if (youOweNewAmt < 0.01){
      document.querySelector(".you-owe-txt-" + this.props.msg.id).style.color = "#00C853";
      document.querySelector(".expense-pic-cover-id-" + this.state.currentUserId + "-" + this.props.msg.expense.id).style.display = "block";
    }
    const update = this.props.update;
    update(this.props.msg.id, rounded);
  }

  // taken from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  /**
   * Deletes a message from the group timeline.
   * Will require a server call to delete the information from our database.
   */
  delete(){
    document.querySelector(".msg-id-" + this.props.msg._id).style.display = "none";
    if (!this.props.msg.isMsg){
      //removes the expense from the right sidebar
      document.querySelector(".expense-small-id-" + this.props.msg._id).style.display = "none";
    }
    Axios.delete(`/g/${this.props.msg.groupID}/msg/${this.props.msg._id}`)
    .then( response => {
      console.log(response)
      socket.emit("delete-msg", {
        message: this.props.msg,
        requestor: this.props.user,
      });
    })
    .then(err => console.log(err));
  }

  /**
   * Returns a new message element for the DOM.
   */
  getMsg() {
    return (
      <div className={"msg-id-" + this.props.msg._id}>
        <div className="group-main-msg">
          <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg._id} onClick={() => this.redirect()}>
          </div>
          <div className={"expense-delete-container expense-delete-container-" + this.props.msg._id} onClick={this.delete}>
            <i className="fa fa-trash"></i>
          </div>
          <div className="group-main-msg-content">
            <strong>{this.props.creator.displayName}</strong> <span className="date-span">{this.timeConverter(this.props.msg.date)}</span> <br />
            {this.props.msg.content}
          </div>
        </div>
      </div>
    )
  }

  /**
   * Returns a new expense element for the DOM.
   */
  getExpense() {
    return (
      <div className={"msg-id-" + this.props.msg._id}>
        <div className="group-expense-msg-container">
          <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg._id} onClick={() => this.redirect()}>
          </div>
          <div className={"expense-delete-container expense-delete-container-" + this.props.msg._id} onClick={this.delete}>
            <i className="fa fa-trash"></i>
          </div>
          <b>{this.props.creator.displayName}</b> created a new expense for ${this.props.msg.expense.cost}: <span className="date-span">{this.timeConverter(this.props.msg.date)}</span>
          <div className="group-main-msg-content">
            <div className="expense-container">
              {
                this.state.totalPaid ? 
                <div className={"expense-cover expense-cover-" + this.props.msg._id}>
                </div> : null
              }
              
              <div className="expense-upper">
                <div className="expense-upper-left">
                  <h3>{this.props.msg.expense.title}</h3>
                  <p><i>"{this.props.msg.content}"</i></p>
                  <div className={"you-owe-container-id-" + this.props.msg._id}>
                    <p className="you-owe-title">You Owe:</p>
                    <p className={"you-owe-txt you-owe-txt-" + this.props.msg._id}>${this.state.youOwe}</p>
                  </div>
                </div>
                <div className="expense-upper-right">
                  <div className="expense-total-remaining-title">
                    Total Remaining:
                  </div>
                  <div className={"expense-remaining expense-remaining-" + this.props.msg._id}>
                    ${this.state.expenseRemaining}
                  </div>

                </div>
              </div>
              <div className="expense-lower">
                <div className="expense-faces">
                  {
                    this.props.msg.expense.members.map(m => {
                      return (
                        <ExpensePic key={m._id} member={m} id={this.props.msg._id}/>
                      );
                    })
                  }
                </div>
                <div className="expense-pay">
                  {
                    (!this.state.totalPaid && this.state.youOwe !== 0) ? 
                    <React.Fragment>
                      <div className={"expense-pay-btn expense-pay-btn" + this.props.msg._id} onClick={this.toggleExpense}>
                        PAY
                      </div>
                      <div className={"expense-close-btn expense-close-btn" + this.props.msg._id} onClick={this.toggleExpense}>
                        CLOSE
                      </div>
                    </React.Fragment> : null
                  }
                </div>
              </div>
            </div>
            <div className={"expense-payment-container expense-payment-container" + this.props.msg._id }>
              <h3>How much would you like to pay?</h3>
              <input id={"paymentInput"+this.props.msg._id} type="number" min="0.01" max={String(this.props.msg.expense.totalRemaining)} step="0.01" defaultValue="0.01" onChange={this.handleInput} />
              <i className="fa fa-check" id="expense-make-payment-btn" onClick={this.deductPayment}></i>
              </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.msg.isMsg) {
      return this.getMsg();
    } else  {
      return this.getExpense();
    }
  }
}

export default GroupMessage