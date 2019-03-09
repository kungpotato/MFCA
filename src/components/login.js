import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import LoginService from '../services/loginService'
import Helper from '../helpers/FunctionHelp'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // isLogin: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  SendData = async (data) => {
    const res = await LoginService.saveToCollection(data)
    if (!Helper.isNull(res)) {
      // console.log(res)
      localStorage.setItem('isLogin', true)

      // var isLogedIn = localStorage.getItem('isLogedIn')

      this.setState((state, props) => {
        props.setLogin(true)
        return {
          isLogin: true
        }
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { target } = e
    const user = target.username.value
    const pass = target.password.value
    // console.log(username)
    const User = {
      username: user,
      password: pass
    }

    this.SendData(User)
  }

  render() {
    // console.log(this.props.isLogin)
    return (
      <div className="pt80 container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Sign in</h4>
              </div>
              <div className="card-body" style={{ paddingLeft: '150px', paddingRight: '150px' }}>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-md-3">
                      <span className="control-label">Username :</span>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" name="username" placeholder="" />
                    </div>
                    <div className="col-md-3 pt20">
                      <span className="control-label">Password :</span>
                    </div>
                    <div className="col-md-9 pt20">
                      <input type="text" className="form-control" name="password" placeholder="" />
                    </div>
                    <div className="col-md-12 pt20">
                      <button type="submit" className="btn btn-primary p-right">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  // bind props เข้ากับ state เพื่อจะนำไปส่งผ่าน props ไปยัง component
  isLogin: state.isLogin
})

const mapDispachToProps = dispach => ({
  setLogin: param => dispach({ type: 'LOGIN_STATUS', isLogin: param })
  // ,onAgeDown: () => dispach({ type: "AGE_DOWN" })
})

// export default Login;
export default connect(mapStateToProps, mapDispachToProps)(Login)
