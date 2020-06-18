#!/usr/bin/env node

/**
 * 安装项目所有包,包括packages文件夹里的
 */
const { spawnSync, execSync, exec, spawn } = require('child_process');
const { triggerCommand, getCliName, greenLog, purpleLog, readFileDisplay } = require('./utils')
const path = require('path')
const fs = require('fs')
const npmCli = getCliName(process.env.INSTALL_SCRIPT || 'npm')
const cdCli = getCliName('cd')
const PCK = 'package.json'
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const packages = resolveApp('apps')
const startInstall = cwd => triggerCommand(() => spawnSync(npmCli, [ 'install'], { stdio: 'inherit', cwd }))

readFileDisplay({
  filePath: packages,
  extensions: ['.json'],
  sync: true,
  matchedExtensionCallback: function (result) {
    pckList = result.filter(file => file.filename === PCK)
  },
  onError: e => reject(e)
})
const installAll = async () => {
  for await (let p of pckList) {
    greenLog(`-->开始安装packages${p.relativeFileDir.replace(`/${PCK}`, '')}的依赖`)
    await startInstall(p.absoluteFileDir)
  }
  purpleLog(`-->开始安装项目依赖`)
  await startInstall()
}
installAll()