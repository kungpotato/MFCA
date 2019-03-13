import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import './style/inputMat.css'
// import {
//   BrowserRouter as Router, Route, Link, Redirect
// } from 'react-router-dom'
import {
  HashRouter as Router, Route, Link, Redirect
} from 'react-router-dom'
import Home from './components/Home'
import InputMaterail from './components/inputMaterial'
import InputConfig from './components/inputConfig'
import Register from './components/register'
import InputHistory from './components/inputHistory'
import MaterialFlow from './components/materialFlow'
import Analysys from './components/analysys'
import LoginCom from './components/login'
// import LoginService from './services/loginService'
import Helper from './helpers/FunctionHelp'
import PrivateRoute from './components/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    const login = window.localStorage.getItem('isLogin')

    // console.log(item)
    // ส่งไปเผื่ออนาคตได้ใช้
    if (!Helper.isNull(login)) {
      this.setState((state, props) => {
        props.setLogin(login)
      })
    }
  }

  // SendData = async (data) => {
  //   const res = await LoginService.saveToCollection(data)
  //   if (!Helper.isNull(res)) {
  //     this.setState((state, props) => {
  //       props.setLogin(true)
  //       return {
  //         isLogin: true
  //       }
  //     })
  //   }
  // }

  render() {
    const { isLogin } = this.props
    let privateNav = ''
    let LogoutLink = ''
    let loginLink = ''
    let registerLink = ''

    if (isLogin) {
      privateNav = (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link scroll-link fw" to="/input-config">Data Config</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link scroll-link fw" to="/input-material">Process</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link scroll-link fw" to="/input-history">History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link scroll-link fw" to="/material-flow">Material Flow</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link scroll-link fw" to="/analysys">Analysys</Link>
          </li>
        </React.Fragment>
      )
      // goLogin = (<Redirect to="/login"/>)
      LogoutLink = (<li className="nav-item"><Link className="nav-link scroll-link fw" to="/logout" refresh="true">Logout</Link></li>)
    } else {
      loginLink = (<li className="nav-item"><Link className="nav-link scroll-link fw" to="/login">Login</Link></li>)
      registerLink = (<li className="nav-item"><Link className="nav-link scroll-link fw" to="/register">Register</Link></li>)
    }
    // console.log(isLogin)

    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-dark fixed-top navbar-expand-md ">
              <div className="container ">
                <h4 className="clw">MFCA</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link scroll-link fw" to="/">Home</Link>
                    </li>
                    {privateNav}
                    {registerLink}
                    {loginLink}
                    {LogoutLink}
                  </ul>
                </div>
              </div>
            </nav>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} isLogin={isLogin} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <React.Fragment>
                  <LoginCom {...props} isLogin={isLogin} />
                  {isLogin && <Redirect to="/" />}
                </React.Fragment>
              )}
            />
            <Route
              path="/logout"
              render={() => (
                <React.Fragment>
                  {localStorage.clear()}
                  <Redirect to="/" />
                  {window.location.reload()}
                </React.Fragment>
              )}
            />
            <PrivateRoute path="/input-material" component={InputMaterail} />
            <PrivateRoute path="/input-config" component={InputConfig} />
            <PrivateRoute path="/input-history" component={InputHistory} />
            <PrivateRoute path="/material-flow" component={MaterialFlow} />
            <PrivateRoute path="/analysys" component={Analysys} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
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
// export default App;
export default connect(mapStateToProps, mapDispachToProps)(App)
