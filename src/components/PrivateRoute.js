import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Helper from '../helpers/FunctionHelp'

function PrivateRoute({ component: Component, ...rest }) {
  const login = !Helper.isNull(window.localStorage) ? window.localStorage.getItem('isLogin') : false

  return (
    <Route
      {...rest}
      render={props => (
        login ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}

export default PrivateRoute
