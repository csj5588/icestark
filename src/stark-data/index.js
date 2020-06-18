import { store } from '@ice/stark-data';

const userInfo = { name: 'Tom', age: 18 };
store.set('store', 'CH'); // 设置语言
store.set('user', userInfo); // 设置登录后当前用户信息

setTimeout(() => {
  store.set('store', 'EN');
}, 3000);