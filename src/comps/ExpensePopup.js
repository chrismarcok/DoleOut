import React from 'react';
import '../style/ExpensePopup.css';

class ExpensePopup extends React.Component {

  state = {
    expenseTitle: "",
    expenseContent: "",
    expenseCost: "",
    expenseMembers: ""
  }

  createExpense = () => {
    this.props.addExpense(this.state.expenseTitle, this.state.expenseContent, this.state.expenseCost, this.state.expenseMembers);         
}

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <form className="new-expense-form">
              <h3>
                Expense Title
              </h3>
              <input id="expenseTitleInput" type="text" name="expenseTitle" placeholder="Title" onChange={this.handleInputChange}></input>
              <h3>
                Content 
              </h3>
              <input id="expenseContentInput" type="text" name="expenseContent" placeholder="a message about your expense" onChange={this.handleInputChange}></input>
              <h3>
                Cost 
              </h3>
              <input id="expenseCostInput" type="text" name="expenseCost" placeholder="the total cost of your expense" onChange={this.handleInputChange}></input>
              <h3>
                Members
              </h3>
              <input id="expenseMembersInput" type="text" name="expenseMembers" placeholder="3, 7, 11, 4, ..." onChange={this.handleInputChange}></input>
            </form>
          <button onClick={() => this.createExpense()}> Create Expense </button>
          <button onClick={this.props.closePopup}> Close form </button>
        </div>
      </div>
    );
  }
}

export default ExpensePopup;