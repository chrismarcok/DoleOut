import React from 'react'

class GroupMessage extends React.Component{

  componentDidMount(){

    //Todo: why does only the first pic work for any user ????????????? 
    const pic = document.querySelector("#group-main-profile-pic-id-" + this.props.msg.user.id)
    pic.style.backgroundImage = "url('"+ this.props.msg.user.picUrl +"')"
    console.log(pic.style.backgroundImage)
  }

  render() {
    return (
      <div>
        <div className="group-main-msg">
          <div className="group-main-msg-profile-pic" id={"group-main-profile-pic-id-" + this.props.msg.user.id}>
          </div>
          <div className="group-main-msg-content">
            <strong>{this.props.msg.user.username}</strong> <br/>
            {this.props.msg.content}
          </div>
        </div>
      </div>
    )
  }
}

export default GroupMessage