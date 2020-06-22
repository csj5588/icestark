
export default _ => {
  const reg = /\?ticket=[A-Za-z0-9]+/
  const href = location.href
  let hrefNoTicket = href.replace(reg, '')
  if (reg.test(href)) {
    if (window.history && window.history.replaceState) {
      history.replaceState(null, document.title, hrefNoTicket)
    } else {
      location.href = hrefNoTicket
    }
  }
}
