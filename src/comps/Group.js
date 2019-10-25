import React from 'react'

class Group extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      hover: false
    }
    this.toggleHover = this.toggleHover.bind(this)
  }


  componentDidMount () {
    const icon = document.querySelector("#icon" + this.props.id)
    icon.className = "group-icon fa fa-" + this.props.icon
    const group = document.querySelector(".group-div-id-" + this.props.id)
    group.style.backgroundColor = this.props.colorBg
  }

  stringifyMembers(membersList){
    if (membersList.length === 0){
      return "No members."
    }
    let r = ""
    for (let i = 0; i < membersList.length; i++){
      r += membersList[i] + ", "
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

  render() {

    let colorBg
    if (this.state.hover){
      colorBg = {backgroundColor: '#ddd'}
    } else {
      colorBg = {backgroundColor: this.props.colorBg}
    }

    return (
      <div>
        <div style={colorBg} className={"group-div group-div-id-" + this.props.id} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            
            <h1 className="grouppage-title">
            <i id={"icon" + this.props.id}></i> {this.props.name}
            </h1>
            <h3>
              Members: { this.stringifyMembers(this.props.members) }
            </h3>
        </div>     
      </div>
    )
  }

}

export default Group