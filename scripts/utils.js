// 工具函数
const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const isWindows = process.platform === 'win32'
// 兼容不同系统
exports.getCliName = cliName => isWindows ? `${cliName}.cmd` : cliName

const createLog = chalkFunctor => msg => console.log(chalkFunctor(msg))
exports.createLog = createLog
exports.purpleLog = createLog(chalk.hex('#ff1f96').underline)
exports.redLog = createLog(chalk.red)
const greenLog = createLog(chalk.hex('#00d364'))
exports.greenLog = greenLog

exports.triggerCommand = (command, events = {}) => {
  return new Promise((resolve, reject) => {
    const res = command()
    if (res && res.status === 0) {
      resolve(res)
      events.onSuccess && events.onSuccess(res)
    } else {
      events.onError && events.onError(res)
      reject(res)
    }
  })
}

/**
 * 文件遍历方法，可同步和异步
 * @param filePath 需要遍历的文件路径
 * {
 *  filePath: 需要遍历的文件路径
 * }
 */
const defaulOptions = {
  filePath: fs.realpathSync(process.cwd()),
  extensions: ['.html'],
  excludeDir: ['node_modules'], // 排除在外的文件夹
  matchedExtensionCallback: function (result) {
    console.log('matchedExtensionCallback: ', result)
  }
}
// 读取指定路径的文件，并对后缀名进行过滤
exports.readFileDisplay = function (options) {
  if (typeof options === 'string') options = {
    filePath: options
  }
  options = Object.assign({}, defaulOptions, options || {})
  const rootFilePath = options.filePath
  const isSync = options.sync
  const res = []
  const fileDisplay = function (filePath) {
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
      if (err) {
        console.warn(err)
      } else {
        // 遍历读取到的文件列表
        files.forEach(function (filename) {
          // 获取当前文件的绝对路径
          // console.log('filename: ', filePath, filename, path.extname(filename))
          var filedir = path.join(filePath, filename);
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          
          fs.stat(filedir, function(eror, stats) {
            if (eror) {
              console.warn('获取文件stats失败');
              typeof options.onError === 'function' && options.onError(eror)
            } else {
              var isFile = stats.isFile(); // 是文件
              var isDir = stats.isDirectory();// 是文件夹
              if (isFile && options.extensions.indexOf(path.extname(filename)) > -1) {
                options.matchedExtensionCallback({
                  filename,
                  relativeFileDir: path.join(filePath.replace(rootFilePath, ''), filename),
                  absoluteFileDir: filePath
                })
              }
              if (isDir) {
                fileDisplay(filedir, options); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          })
        });
      }
    });
  }
  const fileDisplaySync = (filePath, callback) => {
    let files = fs.readdirSync(filePath)
    for(filename of files){
        let filedir = path.join(filePath, filename);
        let stats = fs.statSync(filedir);
        let isFile = stats.isFile(); // 是文件
        let isDir = stats.isDirectory() ;// 是文件夹
        if (isFile && options.extensions.indexOf(path.extname(filename)) > -1) {
          res.push({
            filename,
            relativeFileDir: path.join(filePath.replace(rootFilePath, ''), filename),
            absoluteFileDir: filePath
          })
        }
        if (isDir && !options.excludeDir.includes(filename)) {
          fileDisplaySync(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    }
    callback && callback(res);
  }
  isSync && chalk.cyan.bold('读取文件中...')
  return isSync ? fileDisplaySync(options.filePath, res => {
    options.matchedExtensionCallback(res)
  }) : fileDisplay(options.filePath)
}
