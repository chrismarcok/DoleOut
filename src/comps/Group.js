import React from 'react'

class Group extends React.Component {
  componentDidMount () {
    const icon = document.querySelector("#icon" + this.props.id)
    icon.className = "fa fa-" + this.props.icon
    const group = document.querySelector(".group-div-id-" + this.props.id)
    group.style.backgroundColor = this.props.colorBg
  }

  render() {
    return (
      <div>
        <div className={"group-div group-div-id-" + this.props.id}>
            <i id={"icon" + this.props.id}></i>
          <h1>
            {this.props.name}
          </h1>
        </div>     
      </div>
    )
  }
}

export default Group