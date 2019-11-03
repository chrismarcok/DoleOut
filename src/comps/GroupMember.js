import React from 'react'

class GroupMember extends React.Component {

  constructor(props){
    super(props)
    this.clickEvent = this.clickEvent.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    const pic = document.querySelector("#groupmember-pic-" + this.props.member.id)
    pic.style.backgroundImage = "url('" + this.props.member.picUrl + "')"
    if (this.props.admin === false){
      document.querySelector(".groupmember-delete-" + this.props.member.id).style.display = "none";
    }
  }
  
  /**
   * Redirects to a group member's profile page.
   */
  clickEvent(e){
    const classLst = e.target.classList;
    if (!classLst.contains("groupmember-delete") && e.target.className !== "fa fa-trash"){
      if (this.props.admin === true){
        window.location.href = "/u/" + this.props.member.id + "/admin";
      }
      else {
        window.location.href = "/u/" + this.props.member.id;
      }
    }
  }

  /**
   * Hides a group member, called when a member is deleted.
   * Will require a server call to remove the member from a database
   */
  delete(){
    document.querySelector(".groupmember-id-" + this.props.member.id).style.display = "none";
  }

  render() {
    return (
      <div onClick={ this.clickEvent }>
        <div className={"groupmember groupmember-id-" + this.props.member.id}>
          <div className={"groupmember-pic"} id={ "groupmember-pic-" + this.props.member.id }>
          </div>
          <h3 className="groupmember-name">
            {this.props.member.username}
            </h3>
          <div className={"groupmember-delete groupmember-delete-" + this.props.member.id} onClick={this.delete}><i className="fa fa-trash"></i></div>
        </div>
      </div>
    )
  }
}

export default GroupMember