import React from 'react'

class ExpensePic extends React.Component{


  componentDidMount(){
    const pic = document.querySelector(".expense-pic-id-" + this.props.member.id + "-" + this.props.id);
    pic.style.backgroundImage = "url('" + this.props.member.picUrl + "')";
    const picCover = document.querySelector(".expense-pic-cover-id-" + this.props.member.id + "-" + this.props.id);
    picCover.style.display = this.props.member.paid ? "block" : "none";
  }

  redirect(){
    window.location = "/u/" + this.props.member.id;
  }

  render() {
    return (
      <div className="expense-pic-small-container">
        <div className={"expense-pic-cover expense-pic-cover-id-" + this.props.member.id + "-" + this.props.id}>
        </div>
        <div className={"expense-pic-small expense-pic-id-" + this.props.member.id + "-" + this.props.id} onClick={() => this.redirect()}>
        </div>
      </div>
    )
  }
}

export default ExpensePic