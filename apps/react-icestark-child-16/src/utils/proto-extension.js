
/**
 * 不管Promise对象最后状态是 Fulfilled | Rejected, 最后执行的finally函数
 * @param {Function} 回调函数
 */
if (!Promise.prototype.finally) {
  /* eslint-disable-next-line no-extend-native */
  Promise.prototype.finally = function (callback) {
    const p = this.constructor;
    return this.then(
      value => Promise.resolve(callback.call(this, value)),
      reason => Promise.reject(callback.call(this, reason)).then(null, () => { throw reason; })
    );
  };
}

/**
 * Date.prototype下的格式方法
 * @param {String} format 格式化方式
 * @example
 *    年-月-日 时:分:秒
 *    yyyy-MM-dd hh:mm:ss:SS => 2016-10-29 10:22:22.176
 *    yyyy年MM月dd日 hh:mm:ss:SS => 2016年10月29日 10:22:22.176
 */
/* eslint-disable-next-line no-extend-native */
Date.prototype.format = function (format) {
  const date = {
    'y+': this.getFullYear(),
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds(),
  };
  let k;

  // guard-for-in no-restricted-syntax
  /* eslint-disable-next-line */
  for (k in date) {
    const re = new RegExp(`(${k})`);
    /* eslint-disable-next-line no-loop-func */
    format = format.replace(re, $1 => {
      return date[k] < 10 ? `0${date[k]}` : date[k];
    });
  }

  return format;
};

// oppo r7 有这个问题
if (!Array.prototype.find) {
  /* eslint-disable-next-line no-extend-native */
  Array.prototype.find = function (operator) {
    for (let i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return this[i];
      }
    }
  };
}

if (!Array.prototype.findIndex) {
  /* eslint-disable-next-line no-extend-native */
  Array.prototype.findIndex = function (operator) {
    for (let i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return i;
      }
    }
  };
}

if (!Array.prototype.some) {
  /* eslint-disable-next-line no-extend-native */
  Array.prototype.some = function (operator) {
    for (let i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        return true;
      }
    }
    return false;
  };
}

if (!Array.prototype.every) {
  /* eslint-disable-next-line no-extend-native */
  Array.prototype.every = function (operator) {
    let n = 0;
    /* eslint-disable-next-line */
    for (var i = 0, len = this.length; i < len; i++) {
      if (operator.call(this, this[i], i)) {
        n++;
      }
    }

    /* eslint-disable-next-line */
    if (n === len) {
      return true;
    }

    return false;
  };
}

if (!Array.prototype.fill) {
  if (Array.fill) {
    /* eslint-disable-next-line no-extend-native */
    Array.prototype.fill = Array.fill;
  } else {
    /* eslint-disable-next-line no-extend-native */
    Array.prototype.fill = function (obj) {
      for (let i = 0, len = this.length; i < len; i++) {
        this[i] = obj;
      }
      return this;
    };
  }
}
