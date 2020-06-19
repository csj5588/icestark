export function getAuthority () {
  return 'user'
}

export function setAuthority (authority) {
  return localStorage.setItem('ice-pro-authority', authority)
}

/* ******************** 判断类方法权限的decorator ************************ */
export function getButtonAuthority (routeAuthority, buttonId) {
  return routeAuthority.indexOf(`${buttonId}`) < 0
}

export function checkButtonArray (routeAuthority, buttonType, buttonIdList) {
  buttonType.some(item => {
    if (buttonIdList[buttonType]) {
      return getButtonAuthority(routeAuthority, buttonIdList[buttonType])
    }
    return false
  })
}

export const checkAuthority = buttonType => target => {
  const store = target.$store.getState()
  const buttonCtrl = store.auth.buttonCtrl
  const userQueryButtonCtrl = store.auth.userQueryButtonCtrl
  const routeAuthority = store.auth.routeAuthority
  let checkResult = false
  if (typeof buttonType === 'string') {
    const buttonId = (buttonCtrl[buttonType] || userQueryButtonCtrl[buttonType]).id
    checkResult = getButtonAuthority(routeAuthority, buttonId)
  } else if (Array.isArray(buttonType)) {
    checkResult = checkButtonArray(routeAuthority, buttonType, { ...buttonCtrl, ...userQueryButtonCtrl })
  }
  if (!checkResult) {
    return (_ => {
      target.$message.error('您没有操作权限')
      /* eslint-disable-next-line */
      return Promise.reject('您没有操作权限')
    })()
  }
}
