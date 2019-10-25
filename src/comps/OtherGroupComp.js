import React from 'react'

class OtherGroupComp extends React.Component {
  render() {
    return (
      <div>
        <a href={"/g/" + this.props.group.id}>
        <div className="other-group-container">
          {this.props.group.name}
        </div>
        </a>
      </div>
    )
  }
}

export default OtherGroupComp