import React from 'react'

class ExpensePic extends React.Component{


  componentDidMount(){
    const pic = document.querySelector(".expense-pic-id-" + this.props.member.id);
    pic.style.backgroundImage = "url('" + this.props.member.picUrl + "')";
  }

  redirect(){
    window.location = "/u/" + this.props.member.id;
  }

  render() {
    return (
      
        <div className={"expense-pic-small expense-pic-id-" + this.props.member.id} onClick={() => this.redirect()}></div>
      
    )
  }
}

export default ExpensePic