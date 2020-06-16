/* eslint-disable import/no-mutable-exports */
import AuthorizedRoute from './AuthorizedRoute'
import Secured from './Secured'
import CheckPermissions, { setCurrentAuthority } from './CheckPermissions'

const Authorized = {}

Authorized.Secured = Secured
Authorized.AuthorizedRoute = AuthorizedRoute
Authorized.check = CheckPermissions
Authorized.CheckPermissions = CheckPermissions

// 更新权限
export const reloadAuthorized = () => {
  // 获取到权限树后，设置为 user 权限
  setCurrentAuthority('user')
}

export {
  AuthorizedRoute,
  CheckPermissions,
  Secured,
}

export default Authorized
