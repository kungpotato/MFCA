// import Helper from '../helpers/FunctionHelp'

const Authen = {
  isAuthenticated: false, // eslint-disable-line
  authenticate(param, cb) {
    this.isAuthenticated = true
    // setTimeout(cb, 100); // fake async
    cb(true)
  },
  signout(cb) {
    this.isAuthenticated = false
    cb(false)
  }
}

export default Authen
