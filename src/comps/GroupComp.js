import React from 'react'
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
  }

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

  hide(){
    document.querySelector(".group-div-id-" + this.props.id).style.display = "none";
    //Here we would have to remove the group from a database or something.
  }

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
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
              <i id={"icon" + this.props.id}></i> <span className="group-name" id={"group-name-id-" + this.props.id}>{this.state.name}</span> <input className="group-comp-input" id={"group-comp-input-id-" + this.props.id } type="text" name="title" defaultValue={this.state.name} onChange={this.handleInputChange}></input>
            </h1>
            <div className="group-div-change-btns">
              <div>
                
                  <i className="fa fa-check" id={"group-i-check-" + this.props.id} onClick={this.confirm}></i>
                
                <i className="fa fa-edit" id={"group-i-edit-" + this.props.id} onClick={this.edit}></i>
                <i className="fa fa-trash" onClick={this.hide}></i>
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