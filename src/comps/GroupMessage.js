import React from 'react'
import ExpensePic from '../comps/ExpensePic'
import { uid } from 'react-uid'

class GroupMessage extends React.Component {

  /* 
  A group message represents either a chat message, or an expense in the chat.
  */

 constructor(props) {
  super(props)

  this.state = {
    currentlyPaying: false,
    payAmount: "0.01",
    expenseRemaining: (this.props.msg.type === "expense") ? this.props.msg.expense.remaining : undefined
  }
  this.toggleExpense = this.toggleExpense.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.deductPayment = this.deductPayment.bind(this);
  
}


  componentDidMount() {
    const pic = document.querySelector("#group-main-profile-pic-id-" + this.props.msg.id);
    pic.style.backgroundImage = "url('" + this.props.msg.user.picUrl + "')";
  }

  redirect() {
    window.location = "/u/" + this.props.msg.user.id;
  }

  toggleExpense(){
    if (!this.state.currentlyPaying){
      this.setState({
        currentlyPaying: true
      });
      document.querySelector(".expense-pay-btn" + this.props.msg.id ).style.display = "none";
      document.querySelector(".expense-close-btn" + this.props.msg.id ).style.display = "block";
      document.querySelector(".expense-payment-container" + this.props.msg.id ).style.display = "block";
    } else {
      this.setState({
        currentlyPaying: false
      });
      document.querySelector(".expense-close-btn" + this.props.msg.id ).style.display = "none";
      document.querySelector(".expense-pay-btn" + this.props.msg.id ).style.display = "block";
      document.querySelector(".expense-payment-container" + this.props.msg.id).style.display = "none";
    }
  }

  handleInput(){
    this.setState(
      {
        payAmount: document.querySelector("#paymentInput").value
      }
    );
  }

  deductPayment(){
    const amount = this.state.expenseRemaining - Number(this.state.payAmount)
    let rounded = parseFloat(Math.round(amount * 100) / 100).toFixed(2);
    if (rounded < 0){
      rounded = Number(0).toFixed(2);
    }
    this.setState({
      expenseRemaining: rounded
    })
  }

  // taken from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp * 1000);
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

  getMsg() {
    return (
      <div>
        <div className="group-main-msg">
          <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg.id} onClick={() => this.redirect()}>
          </div>
          <div className="group-main-msg-content">
            <strong>{this.props.msg.user.username}</strong> <span className="date-span">{this.timeConverter(this.props.msg.date)}</span> <br />
            {this.props.msg.content}
          </div>
        </div>
      </div>
    )
  }

  getExpense() {
    return (
      <div className="group-expense-msg-container">
        <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg.id} onClick={() => this.redirect()}>
        </div>
        <b>{this.props.msg.user.username}</b> created a new expense for ${this.props.msg.expense.cost}: <span className="date-span">{this.timeConverter(this.props.msg.date)}</span>
        <div className="group-main-msg-content">
          <div className="expense-container">
            <div className="expense-upper">
              <div className="expense-upper-left">
                <h3>{this.props.msg.expense.title}</h3>
                <p><i>"{this.props.msg.content}"</i></p>
                <p>You Owe:</p>
                $unknown
              </div>
              <div className="expense-upper-right">
                <div className="expense-total-remaining-title">
                  Total Remaining:
                </div>
                <div className={"expense-remaining expense-remaining-" + this.props.msg.id}>
                  ${this.state.expenseRemaining}
                </div>

              </div>
            </div>
            <div className="expense-lower">
              <div className="expense-faces">
                {
                  this.props.msg.expense.members.map(m => {
                    return (
                      <ExpensePic key={uid(m)} member={m} id={this.props.msg.expense.id} />
                    );
                  })
                }
              </div>
              <div className="expense-pay">
              <div className={"expense-pay-btn expense-pay-btn" + this.props.msg.id} onClick={this.toggleExpense}>
                  PAY
                </div>
                <div className={"expense-close-btn expense-close-btn" + this.props.msg.id} onClick={this.toggleExpense}>
                  CLOSE
                  </div>
              </div>
            </div>
          </div>
          <div className={"expense-payment-container expense-payment-container" + this.props.msg.id }>
            <h3>How much would you like to pay?</h3>
            <input id="paymentInput" type="number" min="0.01" max={String(this.props.msg.expense.remaining)} step="0.01" defaultValue="0.01" onChange={this.handleInput} />
            <i className="fa fa-check" id="expense-make-payment-btn" onClick={this.deductPayment}></i>
            </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.msg.type === "msg") {
      return this.getMsg();
    } else if (this.props.msg.type === "expense") {
      return this.getExpense();
    }
  }
}

export default GroupMessage