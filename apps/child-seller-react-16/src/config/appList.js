/**
 * 所有的APP 对应的appID
 * apiHost :业务接口域名配置 区分测试换和线上环境
 *
 */
import Cookie from 'utils/cookies'
import build from './build';
const saveAppKey = 'cur-auth-app'
const HOST = window.location.host;
const DEFAULT_ROOT = '/';
const IS_DEV = build.IS_DEV;

let curEnv = /test/.test(HOST) ? 'test' : 'online';

// 默认的接口域名 腾讯机房
const defaultApiHost = {
  test: {
    root: '//testapi.meeshow.com/'
  },
  online: {
    root: '//api.meeshow.com/'
  }
};

const AppList = [
  {
    appid: 'starstar',
    name: '二次元主播',
    // 业务接口域名配置
    apiHost: {
      test: {
        root: '//testapi.meeshow.com/'
      },
      online: {
        root: '//api.meeshow.com/'
      }
    }
  },
  {
    appid: 'haokan',
    name: '好看相亲',
    apiHost: {
      test: {
        root: '//testapi.imilive.cn/'
      },
      online: {
        root: '//service.meelove.cn/'
      }
    }
  },
  {
    appid: 'queen',
    name: '不就',
    apiHost: {
      test: {
        root: '//testapi.meeshow.com/'
      },
      online: {
        root: '//api.meeshow.com/'
      }
    }
  },
  {
    appid: 'gmu',
    name: '积目',
    apiHost: {
      test: {
        root: '//al-testapi.meeshow.com/'
      },
      online: {
        root: '//al-api.meeshow.com/'
      }
    }
  },
  {
    appid: 'gaia',
    name: '种子视频',
    apiHost: {
      test: {
        root: '//testapi.meeshow.com/'
      },
      online: {
        root: '//api.meeshow.com/'
      }
    }
  }
];
export default AppList

/**
 * 获取业务接口的域名，不同app 域名不一样
 * 主要原因： 区分 阿里机房 腾讯机房 百度机房
 **/
export const getApiHost = () => {
  if (IS_DEV) {
    return {
      root: DEFAULT_ROOT
    }
  }

  let app = Cookie.getItem(saveAppKey);
  console.log('this app ', app)
  const item = AppList.filter(one => one.appid === app)[0];
  if (!item) {
    return defaultApiHost
  }
  return item.apiHost[curEnv] || defaultApiHost
}
