import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  const login = window.localStorage.getItem('isLogin')

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
