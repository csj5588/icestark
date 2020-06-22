import $user, { userPromise } from 'user'
import $common from 'utils/common'
import $S from 'service'

import $loading from 'components/loading'
import LoadingBar from 'iview-ui/loading-bar'
import Message from 'iview-ui/message'
import Modal from 'iview-ui/modal'
import Notice from 'iview-ui/notice'
import $lessVar from '../less/less-var'

const staicMixMap = {
  // 用户
  $user,

  // service
  $S,

  // lib
  $common,

  // ui
  $loading,
  $lessVar,
  $Message: Message,
  $Modal: Modal,
  $Notice: Notice,
  $Loading: LoadingBar,
}


const inject = (source, key, val) => {
  if (source[key]) {
    inject(source, `_${key}`, val)
  } else {
    source[key] = val
  }
}

const mix = (source, mixMap) => {
  Object.keys(mixMap).map((key) => {
    let val = mixMap[key]
    inject(source, key, val)
    inject(source.prototype, key, val)
  })
}

export default (source, more = {}) => {
  mix(source, {
    ...staicMixMap,
    ...more
  })

  userPromise.then(data => {
    mix(source, { $userInfo: $user.get() })
  })
}