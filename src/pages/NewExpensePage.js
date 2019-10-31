import React from 'react';
import Header from '../comps/Header';
import '../style/NewExpense.css';


class NewExpensePage extends React.Component{
  render() {
    return (
      <div>
        <Header />
        <div className="new-expense-container">
          <div className="new-expense-inner">
            <div className="new-expense-hdr">
              <b>Create New Expense</b>
            </div>
            <form className="new-expense-form">
              <h3>
                Expense Title
              </h3>
              <input id="expenseTitleInput" type="text" name="title" placeholder="Title" onChange={this.handleInputChange}></input>
              <h3>
                Content 
              </h3>
              <input id="expenseMembersInput" type="text" name="expenseMembers" placeholder="a message about your expense" onChange={this.handleInputChange}></input>
              <h3>
                Cost 
              </h3>
              <input id="expenseMembersInput" type="text" name="expenseMembers" placeholder="the total cost of your expense" onChange={this.handleInputChange}></input>
              <h3>
                Members
              </h3>
              <input id="expenseMembersInput" type="text" name="expenseMembers" placeholder="3, 7, 11, 4, ..." onChange={this.handleInputChange}></input>
            </form>
            <button onClick={() => this.createExpense()}>Create Expense</button>
          </div>
        </div>
      </div >
    )
  }

  createExpense(){
    window.location = "/";
  }
}

export default NewExpensePage;