import React from 'react'
import ExpensePic from '../comps/ExpensePic'
import { uid } from 'react-uid'

class GroupMessage extends React.Component {

  /* 
  A group message represents either a chat message, or an expense in the chat.
  */

  componentDidMount() {
    const pic = document.querySelector("#group-main-profile-pic-id-" + this.props.msg.id);
    pic.style.backgroundImage = "url('" + this.props.msg.user.picUrl + "')";
  }

  redirect() {
    window.location = "/u/" + this.props.msg.user.id;
  }

  getMsg() {
    return (
      <div>
        <div className="group-main-msg">
          <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg.id} onClick={() => this.redirect()}>
          </div>
          <div className="group-main-msg-content">
            <strong>{this.props.msg.user.username}</strong> <br />
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
        <b>{this.props.msg.user.username}</b> created a new expense for ${this.props.msg.expense.cost}:
        <div className="group-main-msg-content">
          <div className="expense-container">
            <div className="expense-upper">
              <div className="expense-upper-left">
                <h3>{this.props.msg.expense.title}</h3>
                <p>You Owe:</p>
                $unknown
              </div>
              <div className="expense-upper-right">
                <div className="expense-total-remaining-title">
                  Total Remaining:
                </div>
                <div className="expense-remaining">
                  ${this.props.msg.expense.remaining}
                </div>

              </div>
            </div>
            <div className="expense-lower">
              <div className="expense-faces">
                {
                  this.props.msg.expense.members.map(m => {
                    return (
                      <ExpensePic key={uid(m)} member={m} />
                    );
                  })
                }
              </div>
              <div className="expense-pay">
                <div className="expense-pay-btn" onClick={() => window.location = "/e/" + this.props.msg.expense.id}>
                  VIEW
                </div>
              </div>
            </div>
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