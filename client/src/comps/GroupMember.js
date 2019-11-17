import React from 'react'

class GroupMember extends React.Component {

  constructor(props){
    super(props)
    this.clickEvent = this.clickEvent.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    const pic = document.querySelector("#groupmember-pic-" + this.props.member._id)
    pic.style.backgroundImage = "url('" + this.props.member.avatarURL + "')"
    if (this.props.admin === false){
      document.querySelector(".groupmember-delete-" + this.props.member._id).style.display = "none";
    }
  }
  
  /**
   * Redirects to a group member's profile page.
   */
  clickEvent(e){
    const classLst = e.target.classList;
    if (!classLst.contains("groupmember-delete") && e.target.className !== "fa fa-trash"){
      window.location.href = "/u/" + this.props.member._id;
    }
  }

  /**
   * Hides a group member, called when a member is deleted.
   * Will require a server call to remove the member from a database
   */
  delete(){
    document.querySelector(".groupmember-id-" + this.props.member._id).style.display = "none";
  }

  render() {
    return (
      <div onClick={ this.clickEvent }>
        <div className={"groupmember groupmember-id-" + this.props.member._id}>
          <div className={"groupmember-pic"} id={ "groupmember-pic-" + this.props.member._id }>
          </div>
          <h3 className="groupmember-name">
            {this.props.member.displayName}
            </h3>
          <div className={"groupmember-delete groupmember-delete-" + this.props.member._id} onClick={this.delete}><i className="fa fa-trash"></i></div>
        </div>
      </div>
    )
  }
}

export default GroupMember