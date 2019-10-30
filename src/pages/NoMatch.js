import React from 'react'

class NoMatch extends React.Component {
  render() {
    return (
      <div className="no-match">
        <h3>Error 404</h3>
        <a href="http://niceme.me/" id="emoji-404">
        <span role="img" aria-label="clap">click👏to👏go👏to👏nicememe.com👏</span>
        </a>
      </div>
    )
  }
}

export default NoMatch