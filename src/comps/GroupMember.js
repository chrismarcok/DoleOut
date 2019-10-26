import React from 'react'

class GroupMember extends React.Component {

  constructor(props){
    super(props)
    this.clickEvent = this.clickEvent.bind(this)
  }

  componentDidMount(){
    const pic = document.querySelector("#groupmember-pic-" + this.props.member.id)
    pic.style.backgroundImage = "url('" + this.props.member.picUrl + "')"
  }
  
  clickEvent(){
    //make this make a popup here. also need to hide all other popups if they are open.
    console.log(this.props.member.id)
    //for now just redirect to the group member page
    window.location.href = "/u/" + this.props.member.id
  }

  render() {
    return (
      <div onClick={ this.clickEvent }>
        <div className="groupmember">
          <div className={"groupmember-pic"} id={ "groupmember-pic-" + this.props.member.id }>
          </div>
          <h3 className="groupmember-name">
            {this.props.member.username}
            </h3>
        </div>
      </div>
    )
  }
}

export default GroupMember