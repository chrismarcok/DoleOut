import React from 'react'

class ExpensePic extends React.Component{


  componentDidMount(){
    const pic = document.querySelector(".expense-pic-id-" + this.props.member.id + "-" + this.props.id);
    pic.style.backgroundImage = "url('" + this.props.member.picUrl + "')";
    console.log(pic.style.backgroundImage);
  }

  redirect(){
    window.location = "/u/" + this.props.member.id;
  }

  render() {
    return (
      
        <div className={"expense-pic-small expense-pic-id-" + this.props.member.id + "-" + this.props.id} onClick={() => this.redirect()}></div>
        //style="background-image: "url('" + this.props.member.picUrl + "')"
        //style={{background-image: "url('" + this.props.member.picUrl + "')"}}
    )
  }
}

export default ExpensePic