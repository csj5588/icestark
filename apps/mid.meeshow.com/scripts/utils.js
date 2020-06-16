const { format } = require('util')
const shelljs = require('shelljs')
const chalk = require('chalk')

const sep = chalk.gray(':')

const glod6 = '#faad14'
const green6 = '#52c41a'
const red6 = '#f5222d'

/**
 * @function shell包装器
 * @param {method} 要执行的shell方法
 * @param {msg} 执行失败后log打印的信息
 * @param {errorBreak} 是否是致命性错误终止进程
 */
exports.shellWrapper = (method, msg = '', errorBreak = true) => (command, ...rest) => {
  if (!shelljs[method]) {
    exports.logError(`${method} 方法不存在`)
    process.exit()
  }

  if (!command) {
    exports.logError('请输入shell参数')
    process.exit()
  }

  const res = shelljs[method](command, ...rest)
  if (res.code) {
    const remindMsg = `${chalk.hex(glod6).bold('[msg]')}: ${msg}  ${chalk.hex(glod6).bold('[command]')}: ${command}\n`
    if (errorBreak) {
      exports.logError(remindMsg, res.stderr || res.stdout)
      process.exit()
    } else {
      exports.logWarning(remindMsg)
      return res
    }
  } else {
    return res
  }
}

const exec = exports.shellWrapper('exec', 'git 操作失败！')

/**
* @function 获取当前分支名称
*/
exports.getBranchName = function () {
  return exec('git rev-parse --abbrev-ref -q HEAD', { silent: true }).stdout.replace('\n', '')
}

/**
 * @function 获取当前 git 仓库名
 * 返回示例 `ikice-react-template`
 */
exports.getRepoName = function () {
  const gitRemoteOriginUrl = exec(`git remote get-url origin`, { silent: true }).stdout.replace('\n', '')
  return gitRemoteOriginUrl.split('/').pop().replace(/.git$/, '')
}

/**
 * @function 获取当前仓库远程 http 地址
 * 通过如 `git@code.inke.cn:opd/fe-aws/ikice-react-template.git` 或者 `https://code.inke.cn/opd/fe-aws/ikice-react-template.git`
 * 来获取 https://code.inke.cn/opd/fe-aws/ikice-react-template 这样的链接
 */
exports.getRepoHttpsUrl = function () {
  const gitRemoteOriginUrl = exec(`git remote get-url origin`, { silent: true }).stdout.replace('\n', '')
  if (gitRemoteOriginUrl.indexOf('http') > -1) {
    return gitRemoteOriginUrl.replace(/(\.git$)/, '')
  } else {
    return 'https://' + gitRemoteOriginUrl.replace(/(\S*@|\.git$)/g, '').replace(':', '/')
  }
}

/**
 * @function 获取 merage request 地址
 * 返回示例 https://code.inke.cn/opd/fe-aws/ikice-react-template/merge_requests/new?merge_request%5Bsource_branch%5D=fromBranch
 */
exports.getNewMergeRequestUrl = function (fromBranch) {
  const httpsUrl = exports.getRepoHttpsUrl()
  const path = '/merge_requests/new'
  const search = '?' + new URLSearchParams({ 'merge_request[source_branch]': fromBranch }).toString()
  return httpsUrl + path + search
}

/**
 * @function 获取本地 branch 列表
 * @returns {Array}
 */
exports.getLocalBranchList = function () {
  return exec('git branch', { silent: true }).stdout.split('\n').map(i => i.replace(/\s|^\*/g, '')).filter(Boolean)
}

/**
 * @function 获取目标分支，正在追踪的远程分支名
 * @param {string} targetBranch 目标分支，不穿则去当前分支
 * @returns {string} 返回远程分支名，不存则返回空
 */
exports.getRemoteBranchName = function (targetBranch = exports.getBranchName()) {
  const res = shelljs.exec(`git rev-parse --abbrev-ref ${targetBranch}@{upstream}`, { silent: true })
  if (res.stderr) {
    // 没有正在追踪的远程分支
    return ''
  } else {
    return res.stdout.trim()
  }
}

const prefix = exports.getRepoName()

exports.normalLogWrapper = color => (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk[color](prefix), sep, msg)
}

exports.normalLogHexWrapper = hex => (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.hex(hex).bold(prefix), sep, msg)
}

// 颜色取自 [ant.design](https://ant.design/docs/spec/colors-cn)
exports.logSuccess = exports.normalLogHexWrapper(green6)
exports.logWarning = exports.normalLogHexWrapper(glod6)
exports.logError = exports.normalLogHexWrapper(red6)
