import React, { Component } from 'react'

const style = {
  pt50: {
    paddingTop: '50px',
    textAlign: 'center'
  }
}
class ErrorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div style={style.pt50}>
          <h1>Please Login</h1>
        </div>
      </div>
    )
  }
}

export default ErrorPage
