import React from 'react'
import Helper from '../scripts/helper.js';
const Color = require('color');


/* This is the group COMPONENT that is listed in the GroupPage*/

class GroupComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      hover: false,
      editHover: false,
      deleteHover: false
    };
    this.toggleHover = this.toggleHover.bind(this);
    this.hide = this.hide.bind(this);
    this.edit = this.edit.bind(this);
    this.confirm = this.confirm.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    const icon = document.querySelector("#icon" + this.props.id);
    icon.className = "group-icon fa fa-" + this.props.icon;
    const group = document.querySelector(".group-div-id-" + this.props.id);
    group.style.backgroundColor = this.props.colorBg;

    const check = document.querySelector("#group-i-check-" + this.props.id);
    check.style.display = "none";

    if (this.props.admin === false){
      //in reality these buttons should be removed. this is ok for now.
      document.querySelector("#group-i-edit-" + this.props.id).style.display = "none";
      document.querySelector("#group-i-trash-" + this.props.id).style.display = "none";
    }
  }

  /**
   * Returns the member list as a string with each member separated by commas.
   */
  stringifyMembers(membersList) {
    if (membersList.length === 0) {
      return "No members."
    }
    let r = ""
    for (let i = 0; i < membersList.length; i++) {
      r += membersList[i].username + ", "
    }
    return r.substring(0, r.length - 2)
  }

  toggleHover() {
    this.setState(
      {
        hover: !this.state.hover
      }
    )
  }

  redirect(e){
    if (!e.target.classList.contains("fa") && !e.target.classList.contains("group-comp-input")){
      window.location = "/g/" + this.props.id;
    }
  }

  /**
   * Hides a group in the groups page, called when a group is deleted.
   * Will require a server call to remove the group from a database
   */
  hide(){
    document.querySelector(".group-div-id-" + this.props.id).style.display = "none";
  }

  /**
   * Allows the name of a group to be edited using an input field.
   */
  edit(){
    const elem = document.querySelector("#group-name-id-" + this.props.id);
    elem.style.display = "none";
    const input = document.querySelector("#group-comp-input-id-" + this.props.id);
    input.style.display = "inline-block";
    const edit = document.querySelector("#group-i-edit-" + this.props.id);
    edit.style.display = "none";
    const check = document.querySelector("#group-i-check-" + this.props.id);
    check.style.display = "inline-block";
  }

  /**
   * Confirms whatever is in the group name input field to become the group's name.
   * Will require a server call to actually change the group's name in our database.
   */
  confirm(){
    const elem = document.querySelector("#group-name-id-" + this.props.id);
    elem.style.display = "inline-block";
    const input = document.querySelector("#group-comp-input-id-" + this.props.id);
    input.style.display = "none";
    this.setState({
      name: input.value
    });
    const icon = document.querySelector("#group-i-edit-" + this.props.id);
    icon.style.display = "inline-block";
    const check = document.querySelector("#group-i-check-" + this.props.id);
    check.style.display = "none";
  }

  render() {
    let colorBg
    if (this.state.hover) {
      colorBg = { backgroundColor: Color(this.props.colorBg).darken(0.1).hsl().string() }
    } else {
      colorBg = { backgroundColor: this.props.colorBg }
    }

    return (
      <div>
          <div style={colorBg} className={"group-div group-div-id-" + this.props.id} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.redirect}>

            <h1 className="grouppage-title">
              <i id={"icon" + this.props.id}></i> <span className="group-name" id={"group-name-id-" + this.props.id}>{this.state.name}</span> <input className="group-comp-input" id={"group-comp-input-id-" + this.props.id } type="text" name="title" defaultValue={this.state.name} onChange={Helper.handleInputChange.bind(this)}></input>
            </h1>
            <div className="group-div-change-btns">
              <div>
                
                  <i className="fa fa-check" id={"group-i-check-" + this.props.id} onClick={this.confirm}></i>
                
                <i className="fa fa-edit" id={"group-i-edit-" + this.props.id} onClick={this.edit}></i>
                <i className="fa fa-trash" id={"group-i-trash-" + this.props.id} onClick={this.hide}></i>
              </div>
            </div>
            <h3>
              Members: {this.stringifyMembers(this.props.members)}
            </h3>
          </div>
        
      </div>
    )
  }

}

export default GroupComp