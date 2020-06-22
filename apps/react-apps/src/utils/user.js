/* eslint-disable import/no-mutable-exports */
import srcConfig from 'src/config';
import $cookies from 'utils/cookies';

const storageKeys = {
  token: 'TOKEN',
  user: 'USER',
};

storageKeys.ticket = storageKeys.token

let userInfo = {};
let userResolve;
let userReject;
const userPromise = new Promise((resolve, reject) => {
  userResolve = resolve;
  userReject = reject;
});

const userReady = userPromise.then.bind(userPromise);

let token = '';

const user = {
  get () {
    return userInfo;
  },

  set (_userInfo) {
    if (_userInfo && typeof _userInfo === 'object') {
      userInfo = _userInfo;
    }
  },

  setToken (_token) {
    if (_token) {
      token = _token;
      localStorage.setItem(storageKeys.token, token);
      $cookies.setItem(storageKeys.token, token);
    }
  },

  removeToken () {
    localStorage.removeItem(storageKeys.token);
    $cookies.removeItem(storageKeys.token);
  },

  getToken () {
    return token;
  },

  logout () {
    this.removeToken();
    setTimeout(() => {
      window.location.href = srcConfig.SSO_LOGOUT_PAGE_SERVICE;
    });
  },

  logoutByPhone () {
  },

  logoutByOtherMethods () {
    console.log('logout')
  },

  _userPromise: userPromise,

  ready: userReady,
};

user.setTicket = user.setToken
user.getTicket = user.getToken
user.removeTicket = user.removeToken

export { userPromise, userReady, userResolve, userReject, storageKeys };

export default user;
