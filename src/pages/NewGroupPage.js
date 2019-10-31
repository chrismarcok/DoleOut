import React from 'react';
import Header from '../comps/Header';
import '../style/NewGroup.css';
import dummy_group_list from './dummy_group_list.json';
const AColorPicker = require('a-color-picker');


class NewGroupPage extends React.Component {

  constructor(props) {
    super(props)
    this.selectColor = this.selectColor.bind(this)
  }

  getGroups() {
    //here we get from a server or smth.
    return dummy_group_list;
  }

  state = {
    title: "",
    groupIcon: "",
    groupMembers: "",
    groupColor: "#eee",
    pickerOpen: false,
    selectColorTxt: "Select Color",
    icon: undefined
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

  createGroup() {
    const allGroups = this.getGroups();
    if (this.state.title === "" || this.state.groupIcon === "" || this.state.groupMembers === "") {
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
      members: []
    }
    //here we could send it to a server, then redirect to that group.
    //window.location = "/g/" + newGroup.newId;
    console.log(newGroup)
    return;
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
              <input id="groupMembersInput" type="text" name="groupMembers" placeholder="3, 7, 11, 4, ..." onChange={this.handleInputChange}></input>
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
              <div className="icon-container" id="icon-choice-user" onClick={() => this.selectIcon("user")}><i className="fa fa-user" ></i></div>
              <div className="icon-container" id="icon-choice-user-secret" onClick={() => this.selectIcon("user-secret")}><i className="fa fa-user-secret" ></i></div>
              <div className="icon-container" id="icon-choice-user-md" onClick={() => this.selectIcon("user-md")}><i className="fa fa-user-md" ></i></div>
              <div className="icon-container" id="icon-choice-user-circle" onClick={() => this.selectIcon("user-circle")}><i className="fa fa-user-circle" ></i></div>
              <div className="icon-container" id="icon-choice-blind" onClick={() => this.selectIcon("blind")}><i className="fa fa-blind" ></i></div>
              <div className="icon-container" id="icon-choice-child" onClick={() => this.selectIcon("child")}><i className="fa fa-child" ></i></div>
              <div className="icon-container" id="icon-choice-male" onClick={() => this.selectIcon("male")}><i className="fa fa-male" ></i></div>
              <div className="icon-container" id="icon-choice-female" onClick={() => this.selectIcon("female")}><i className="fa fa-female" ></i></div>
              <div className="icon-container" id="icon-choice-wheelchair" onClick={() => this.selectIcon("wheelchair")}><i className="fa fa-wheelchair" ></i></div>
              <div className="icon-container" id="icon-choice-mouse-pointer" onClick={() => this.selectIcon("mouse-pointer")}><i className="fa fa-mouse-pointer" ></i></div>

            </form>
            <button onClick={() => this.createGroup()}>Create Group <i className="fa fa-users"></i></button>
          </div>
        </div>
      </div >
    );
  };
}

export default NewGroupPage