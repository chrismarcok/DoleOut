import React from 'react'

class GroupMember extends React.Component {
  render() {
    return (
      <div>
        <div className="groupmember">
          <div className="groupmember-pic-dummy">
          </div>
          <h3 className="groupmember-name">
            {this.props.name}
            </h3>
        </div>
      </div>
    )
  }
}

export default GroupMember