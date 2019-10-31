import React from 'react';
import Header from '../comps/Header';
import Footer from '../comps/Footer';
import '../style/NewGroup.css';

class NewGroupPage extends React.Component {

  state = {
    groupName: "",
    groupIcon: "",
    groupMembers: [],
    groupColor: ""
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    })
  }

  createGroup(){
    return;
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="new-group-container">
          <div className="new-group-inner">
            <div className="new-group-hdr">
              <b>Create New Group</b>
              </div>
            <form className="new-group-form">
              
              <h3>
                Group Title
              </h3>
              <input id="" type="text" name="username" placeholder="Username" onChange={this.handleInputChange}></input>
              <h3>
                Members
              </h3>
              <input id="" type="text" name="username" placeholder="Username" onChange={this.handleInputChange}></input>
              <h3>
                Color
              </h3>
              <input id="" type="password" name="password" placeholder="Password" onChange={this.handleInputChange}></input>
              <h3>
                Icon
              </h3>
              <input id="" type="password" name="rePassword" placeholder="Password" onChange={this.handleInputChange}></input>
              
            </form>
            <button onClick={() => this.createGroup()}>Create Group <i className="fa fa-users"></i></button>
          </div>
        </div>
        <Footer/>
      </div>
    );
  };
}

export default NewGroupPage