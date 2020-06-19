export default _ => {
  const reg = /\?ticket=[A-Za-z0-9]+/;
  const href = window.location.href;
  const hrefNoTicket = href.replace(reg, '');
  if (reg.test(href)) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, document.title, hrefNoTicket);
    } else {
      window.location.href = hrefNoTicket;
    }
  }
};
