import React from 'react'

class OtherGroupComp extends React.Component {



  render() {
    return (
      <div>
        <a href={"/group/" + this.props.group.id}>
        <div /*style={{backgroundColor: this.props.group.colorBg}}*/ className="other-group-container">
          {this.props.group.name}
        </div>
        </a>
      </div>
    )
  }
}

export default OtherGroupComp