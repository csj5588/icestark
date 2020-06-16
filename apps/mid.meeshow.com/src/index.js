import entry from 'entry';
// import entry from './entryPhone/'
import { userPromise } from 'user';
import router from './router';
import store from './store'

userPromise.finally(_ => {
  entry(router, {
    store
  });
});

/**
 * 注: 这句话写在entry.js里是无效的, 必须要webpack种entry直接指向的文件写入才可以
 */
if (module.hot) {
  module.hot.accept()
}
