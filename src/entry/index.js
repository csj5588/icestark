import userInit from '@/entry/user-init';
import ticketReplace from '@/entry/ticket-replace';
import '@/entry/service-intercept';

import 'moment/locale/zh-cn';

userInit();

ticketReplace();
