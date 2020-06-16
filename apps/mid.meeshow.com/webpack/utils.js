const path = require('path')

exports.rootPathResolve = function rootPathResolve (dir) {
  console.log('rootPathResovle: ', path.join(__dirname, '../', dir))
  return path.join(__dirname, '../', dir)
}
