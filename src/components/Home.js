import React, { Component } from 'react'
import '../App.css'

const style = {
  alCenter: {
    textAlign: 'center'
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={style.alCenter}>
        <img src="./gallery-868x0-370902.jpg" alt="" />
      </div>
    )
  }
}


export default Home
