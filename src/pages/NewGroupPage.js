import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../comps/Header';
import NewGroupMemberRow from '../comps/NewGroupMemberRow';
import GroupIcon from '../comps/GroupIcon';
import '../style/NewGroup.css';
import dummy_group_list from './dummy_group_list.json';
import dummy_user_list from './dummy_user_list.json';
import { uid } from 'react-uid';
const AColorPicker = require('a-color-picker');


class NewGroupPage extends React.Component {

  constructor(props) {
    super(props)
    this.selectColor = this.selectColor.bind(this)
    this.newRow = this.newRow.bind(this)
    this.getMembers = this.getMembers.bind(this)
  }

  getGroups() {
    //here we get from a server or smth.
    return dummy_group_list;
  }

  fetchUsers(){
    //get info from db
    return dummy_user_list;
  }

  state = {
    users: this.fetchUsers(),
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

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
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

  getMembers(){
    const usernameInputs = document.querySelectorAll(".group-member-input-field");
    const memberLst = this.state.users;
    const numMembers = this.state.numMembers;
    const result = []
    for (let i = 0; i < numMembers; i++){
      const m = memberLst.filter( m => 
        m.username === usernameInputs[i].value
      );
      result.push(m);
    }
    return result;
  }

  createGroup() {
    const allGroups = this.getGroups();
    if (this.state.title === "" || this.state.groupIcon === "") {
      alert("Please fill out all fields!");
      return;
    }
    //TODO: Get the list of users from the user list based on what is in this.state.groupMembers
    const newId = allGroups[allGroups.length - 1].id + 1;
    const newGroup = {
      id: newId,
      name: this.state.title,
      icon: this.state.groupIcon,
      colorBg: this.state.groupColor,
      members: this.getMembers()
    }
    //here we could send it to a server, then redirect to that group.
    //window.location = "/g/" + newGroup.newId;
    console.log(newGroup)
    alert("The group was made successfully and you can see the object in the console. normally this would redirect you to the group you made, but since we can't write to the JSON file that stores the groups, we cant redirect you to the group you just made");
    return;
  }

  newRow(){
    const newDiv = document.createElement("div")
    newDiv.className = "new-group-member-row-" + this.state.numMembers;
    document.querySelector(".new-group-members-container").appendChild(newDiv)
    ReactDOM.render(<NewGroupMemberRow newRow={this.newRow} num={this.state.numMembers + 1}/>, document.querySelector(".new-group-member-row-" + this.state.numMembers))
    this.setState({
      numMembers: this.state.numMembers + 1
    });
    //If the group inner is too tall, then need to make container block display, otherwise it will look messed up
    if (document.querySelector(".new-group-inner").clientHeight > window.innerHeight - 100){
      document.querySelector(".new-group-container").style.display = "block";
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="new-group-container">
          <div className="new-group-inner">
            <div className="new-group-hdr">
              <b>Create New Group</b>
            </div>
            <form className="new-group-form">

              <h3>
                Group Title
              </h3>
              <input id="groupTitleInput" type="text" name="title" placeholder="Title" onChange={this.handleInputChange}></input>
              <h3>
                Members
              </h3>
              <div className="new-group-members-container">
                <NewGroupMemberRow newRow={this.newRow} num={1}/>
              </div>
              <h3>
                Color <div className="color-preview"></div>
              </h3>
              <button onClick={
                this.selectColor
              }>{this.state.selectColorTxt}</button>
              <div className="picker"
                acp-show-hex="no"
                acp-show-rgb="no"
                acp-show-hsl="no"
                acp-palette="PALETTE_MATERIAL_CHROME"></div>
              <h3>
                Icon
              </h3>

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
            <button onClick={() => this.createGroup()}>Create Group <i className="fa fa-users"></i></button>
          </div>
        </div>
      </div >
    );
  };
}

export default NewGroupPage