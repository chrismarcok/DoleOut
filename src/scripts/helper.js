/*
Updates the state of the "this" object. Called on some arbitrary event.
*/
const Helper = {
  handleInputChange: function(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
}

export { Helper as default }