import $common from 'utils/common'

const win = window
const lib = window.lib || (window.lib = {})
const flexible = lib.flexible || (lib.flexible = {})
const doc = win.document
const docEl = doc.documentElement
let metaEl = doc.querySelector('meta[name="viewport"]')
var flexibleEl = doc.querySelector('meta[name="flexible"]')
let dpr = 0
let scale = 0
let tid

if (metaEl) {
  // console.warn('将根据已有的meta标签来设置缩放比例')
  let match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
  if (match) {
    scale = parseFloat(match[1])
    dpr = parseInt(1 / scale)
  }
} else if (flexibleEl) {
  var content = flexibleEl.getAttribute('content');
  if (content) {
    var initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
    var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
    if (initialDpr) {
      dpr = parseFloat(initialDpr[1])
      scale = parseFloat((1 / dpr).toFixed(2))
    }
    if (maximumDpr) {
      dpr = parseFloat(maximumDpr[1])
      scale = parseFloat((1 / dpr).toFixed(2))
    }
  }
}

if (!dpr && !scale) {
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  
  // 2倍屏, 3倍屏幕, 用2倍方案, 其余一倍方案
  if (isIos) {
    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
      dpr = 3
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
      dpr = 2
    } else {
      dpr = 1
    }
  } else {
    // android 等手机用一倍方案
    dpr = 1
  }

  scale = 1 / dpr
}

docEl.setAttribute('data-dpr', dpr)
if (!metaEl) {
  metaEl = doc.createElement('meta')
  metaEl.setAttribute('name', 'viewport')
  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(metaEl)
  } else {
    let wrap = doc.createElement('div')
    wrap.appendChild(metaEl)
    doc.write(wrap.innerHTML)
  }
}

const refreshRem = function () {
  let width = docEl.getBoundingClientRect().width
  // if (window.screen.width * dpr === width) {
  //   console.log('原始页面')
  // }
  if (window.screen.width === width) {
    width = width * dpr
  }
  // 不限制最低宽度
  // if (width / dpr > 540) {   width = 540 * dpr }
  // 基准为屏幕除以10
  let rem = width / 10
  docEl.style.fontSize = rem + 'px'
  flexible.rem = rem
}

// const refreshRemThrottled = $common.throttle(refreshRem, 150)
const refreshRemThrottled = requestAnimationFrame ? function () {
  requestAnimationFrame(refreshRem)
} : $common.throttle(refreshRem, 150)

win.addEventListener('resize', refreshRemThrottled, false)

win.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    refreshRemThrottled()
  }
}, false)

refreshRem()

flexible.dpr = dpr
flexible.refreshRem = refreshRem

/**
 * rem值转为字符串
 */
flexible.rem2px = function (d) {
  let val = parseFloat(d) * this.rem
  if (typeof d === 'string' && d.match(/rem$/)) {
    val += 'px'
  }
  return val
}

/**
 * @param {String | Number} px值 或 px字符串
 *  flexible.px2rem(375)
 *  flexible.px2rem('375px')
 *
 * @return {String | Number} 返回 rem字符串 或 rem的数字值
 *  10
 *  '10rem'
 *
 */
flexible.px2rem = function (d) {
  let val = parseFloat(d) / this.rem
  if (typeof d === 'string' && d.match(/px$/)) {
    val += 'rem'
  }
  return val
}

export default flexible
