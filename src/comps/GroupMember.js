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
  }
  
  clickEvent(e){
    //make this make a popup here. also need to hide all other popups if they are open.
    //for now just redirect to the group member page
    if (e.target.className !== "groupmember-delete" && e.target.className !== "fa fa-trash"){
      window.location.href = "/u/" + this.props.member.id;
    }
  }

  delete(){
    //here make a call to delete from database.
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
          <div className="groupmember-delete" onClick={this.delete}><i className="fa fa-trash"></i></div>
        </div>
      </div>
    )
  }
}

export default GroupMember