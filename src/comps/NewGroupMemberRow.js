import React from 'react'
import dummy_user_list from '../pages/dummy_user_list.json';
import dummy_group_list from '../pages/dummy_group_list.json';

class NewGroupMemberRow extends React.Component {

  fetchUsers(){
    //server call here
    return dummy_user_list;
  }

  checkValid(num){
    let users;
    if (this.props.groupId !== -1){
      const groupLst = dummy_group_list.filter( g => g.id === this.props.groupId);
      const group = groupLst[0];
      users = group.members;
    } else {
      users = this.fetchUsers();
    }
    const val = document.querySelector("#groupMembersInput-" + num).value;
    const valid = users.filter( u => u.username === val).length !== 0;
    const validator = document.querySelector(".new-member-confirmation-" + num);
    if (val === "donald"){
      validator.innerText = "bruh...";
      validator.style.color = "green";
      
    }
    else if (valid){
      validator.innerText = "valid";
      validator.style.color = "green";
    } else if (val.length === 0){
      validator.innerText = "?";
      validator.style.color = "black";
    } else {
      validator.innerText = "invalid";
      validator.style.color = "red";
    }
    
  }
  render() {
    const num = this.props.num - 1;
    return (
        <div className={"new-group-member-row new-group-member-row-" + num}>
          <p>Member {this.props.num}</p>
          <input className="group-member-input-field" id={"groupMembersInput-" + num} type="text" name="groupMembers" placeholder="Enter Username" maxLength="20" onChange={() => this.checkValid(num)}></input> 
          <div className={"new-member-confirmation new-member-confirmation-" + num}>?</div>
          <span className="new-member-row-btn" onClick={this.props.newRow}> New Row </span>
        </div>
      
    )
  }
}

export default NewGroupMemberRow