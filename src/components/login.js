import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import LoginService from '../services/loginService'
import Helper from '../helpers/FunctionHelp'
import Authen from './Authen'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // isLogin: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    return true
  }

  SendData = async (data) => {
    const res = await LoginService.saveToCollection(data)
    return res
    // var isLogedIn = localStorage.getItem('isLogedIn')
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

    const response = this.SendData(User)

    response.then((res) => {
      if (!Helper.isNull(res)) {
        // console.log(res)
        localStorage.setItem('mfca_user', res.username)
        Authen.authenticate(res, (val) => {
          this.setState((state, props) => {
            props.setLogin(val)
            props.history.push('/')
            return {
              isLogin: val
            }
          })
        })
      }
    })
  }

  render() {
    console.log('render')
    // console.log(this.props.location)
    return (
      <div className="pt80 container">
        <div className="row justify-content-md-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4>Sign in</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-lg-4 col-12">
                      <span>Username :</span>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input type="text" className="form-control" name="username" placeholder="" />
                    </div>
                    <div className="col-lg-4 col-12 pt20 ">
                      <span>Password :</span>
                    </div>
                    <div className="col-lg-8 col-12 pt20">
                      <input type="password" className="form-control" name="password" placeholder="" />
                    </div>
                    <div className="col-lg-12 col-12 pt20">
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
