import React from 'react';
import '../style/NewGroupPopup.css';
import ReactDOM from 'react-dom';
import NewGroupMemberRow from '../comps/NewGroupMemberRow';
import GroupIcon from '../comps/GroupIcon';
import Fetch from '../scripts/fetch.js';
import { uid } from 'react-uid';
import Helper from '../scripts/helper.js';
const AColorPicker = require('a-color-picker');

class NewGroupPopup extends React.Component {

  constructor(props) {
      super(props);
      this.selectColor = this.selectColor.bind(this);
      this.newRow = this.newRow.bind(this);
      this.getMembers = this.getMembers.bind(this);
  }

  state = {
      users: Fetch.fetchUsers(),
      title: "",
      groupIcon: "",
      groupMembers: "",
      groupColor: "#eee",
      pickerOpen: false,
      selectColorTxt: "Select Color",
      iconLst: ["user", "user-secret", "user-md", "user-circle", "blind", "child", "male", "female", "wheelchair", "mouse-pointer"],
      icon: undefined,
      numMembers: 1
  }

  componentDidMount() {
      AColorPicker.from('.picker').on('change', (picker, color) => {
        const colorPrev = document.querySelector(".color-preview");
        colorPrev.style.backgroundColor = color;
        this.setState({
          groupColor: String(color)
        });
      }
      );
  }



  selectColor(e) {
      e.preventDefault();
  
      if (!this.state.pickerOpen) {
        document.querySelector(".picker").style.display = "block";
        this.setState({
          pickerOpen: true,
          selectColorTxt: "Confirm Color"
        });
      } else {
        document.querySelector(".picker").style.display = "none";
        this.setState({
          pickerOpen: false,
          selectColorTxt: "Select Color"
        });
      }
  
  }

  getMembers(){
      const usernameInputs = document.querySelectorAll(".group-member-input-field");
      const memberLst = this.state.users;
      const numMembers = this.state.numMembers;
      const added = [];
      const result = [];
      for (let i = 0; i < numMembers; i++){
        const m = memberLst.filter( m => 
          m.username === usernameInputs[i].value
        );
        if (m.length === 0 || added.includes(m[0].id)){
          console.log("skipping");
          continue;
        }
        result.push(m[0]);
        added.push(m[0].id);
      }
      return result;
  }

  selectIcon(name) {
      if (this.state.groupIcon !== "") {
        const curIcon = this.state.groupIcon;
        document.querySelector("#icon-choice-" + curIcon).className = "icon-container";
      }
      this.setState({
        groupIcon: name
      });
      document.querySelector("#icon-choice-" + name).className = "icon-container icon-selected";
  
  }
  
  close(e, closeFunction){
      console.log(e.target);
      if (e.target.className === "popup-close-btn"){
      closeFunction();
      }
  }

  createGroup() {
    if (this.state.title === "" || this.state.groupIcon === "") {
      alert("Please fill out all fields!");
      return;
    }
    const allGroups = Fetch.fetchGroups();
    //TODO: Get the list of users from the user list based on what is in this.state.groupMembers
    const newId = allGroups[allGroups.length - 1].id + 1;
    const newGroup = {
      id: newId,
      name: this.state.title,
      icon: this.state.groupIcon,
      colorBg: this.state.groupColor,
      members: this.getMembers()
    }
    this.props.addGroup(newGroup);
    this.props.closePopup();

    return;
  }
  
  newRow(){
      const newDiv = document.createElement("div")
      newDiv.className = "new-group-member-row-" + this.state.numMembers;
      document.querySelector(".new-group-members-container").appendChild(newDiv)
      ReactDOM.render(<NewGroupMemberRow newRow={this.newRow} num={this.state.numMembers + 1} groupId={-1}/>, document.querySelector(".new-group-member-row-" + this.state.numMembers))
      this.setState({
        numMembers: this.state.numMembers + 1
      });
  }

  render() {
      return (
        <div className='popup' id ='new_group_popup'>
          <div className='popup_inner'>
            <h1>Create New Group</h1>
            <form className = "new-group-form">
              <h3> Group Title </h3>
              <input id="groupTitleInput" type="text" name="title" placeholder="Title" onChange={Helper.handleInputChange.bind(this)}></input>
              <h3> Members </h3>
              <div className="new-group-members-container">
                <NewGroupMemberRow newRow={this.newRow} num={1} groupId={-1}/>
              </div>
              <h3> Color <div className="color-preview"></div> </h3>
              <button onClick={this.selectColor}>
                {this.state.selectColorTxt}
              </button>
              <div className="picker"
                acp-show-hex="no"
                acp-show-rgb="no"
                acp-show-hsl="no"
                acp-palette="PALETTE_MATERIAL_CHROME"></div>

              <h3> Icon </h3>
              {
                this.state.iconLst.map( icon => {
                  return(
                    <span onClick={() => this.selectIcon(icon)} key={uid(icon)} >
                      <GroupIcon iconName={icon} />
                    </span>
                  );
                })
              }
            </form>

            <div className="popup-btn-container">
                <button className="popup-create-btn" onClick={() => this.createGroup()}> Create Group <i className="fa fa-users"></i></button>
                <button className="popup-close-btn" onClick={(e) => this.close(e, this.props.closePopup)}> Close</button>
            </div>
            
          </div>
        </div>
      );
    }
}

export default NewGroupPopup;