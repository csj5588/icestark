import './service-intercept';
import $user from '@/utils/user';
import { store as stark } from '@ice/stark-data';

import moment from 'moment';
import 'moment/locale/zh-cn';
// 设置日历语言
moment.locale('zh-cn');

// 同步下行userInfo
stark.on('userInfo', (userInfo) => {
  $user.set({ ...userInfo });
}, true)
