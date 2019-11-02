import React from 'react';
import '../style/NewGroupPopup.css';

class NewGroupPopup extends React.Component {

    close(e, closeFunction){
        if (e.target.className === "popup" || e.target.className === "popup-close-btn"){
        closeFunction();
        }
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

export default NewGroupPopup;