/* eslint no-confusing-arrow: 0 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckPermissions, { getCurrentAuthority } from './CheckPermissions'
import Forbidden from '../Forbidden'

class AuthorizedRoute extends React.Component {
  render () {
    const {
      component: Component,
      render,
      authority,
      redirectPath,
      ...rest
    } = this.props

    const target = <Route
      {...rest}
      render={props =>
        Component ? <Component {...props} /> : render(props)
      }
    />

    const noMatch = <Route
      {...rest}
      render={() => <Forbidden />}
    />

    // console.log('CheckPermissions(authority, target, noMatch): ', authority, getCurrentAuthority())
    return CheckPermissions(authority, target, noMatch)
  }
}

export default AuthorizedRoute
