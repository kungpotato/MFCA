import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom' // eslint-disable-line
import Error from './Error'
import Authen from './Authen'
// import Helper from '../helpers/FunctionHelp'

class PrivateRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    const { component: Components, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => (
          <React.Fragment>
            {(Authen.isAuthenticated || rest.isLogin) ? <Components {...props} /> : <Error />}
          </React.Fragment>
        )}
      />
    )
  }
}

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props => (
//         rest.isLogin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location }
//             }}
//           />
//         )
//       )}
//     />
//   )
// }

export default PrivateRoute
