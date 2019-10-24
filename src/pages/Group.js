import React from 'react'
import Header from '../comps/Header.js'

class Group extends React.Component {
  componentDidMount(){
    let { group_number } = this.props.match.params;
    console.log("This is group " + group_number )
  }

  render() {
    
    return (
      <div>
        <Header/>
        <div className="group-container">
          <div className="group-col group-members-col">
          </div>
          <div className="group-col group-main-col">
          </div>
          <div className="group-col group-other-col">
          </div>
        </div>
      </div>
    )
  }
}

export default Group