/**
 * 自动化发布脚本
 * 测试流程：
 * 开发分支提交 -> 合并代码到 test 分支 -> test 分支构建、提交 -> 切回开发分支 -> 发布系统发布（ik-deploy 自动发布）
 * 上线流程：
 * 开发分支提交 -> 合并 master 分支代码 -> 开发分支构建、提交 -> 提 merge requeset -> 手动去发布系统发布
 * 使用方式：
 * 执行 `node scripts/deploy.js`
 * 1. 选择要发布的环境， test - 测试环境；master - 线上环境
 * 2. 输入 GIT 提交信息
 * 3. 脚本将自动执行构建 + 代码合并
 * 4. 如合并代码期间出现冲突，请解决完冲突后，再次执行本脚本
 */
const shelljs = require('shelljs')
const inquirer = require('inquirer')
const open = require('open')
const { getBranchName, getRepoName, logSuccess, logWarning, logError, getLocalBranchList, getNewMergeRequestUrl, shellWrapper, getRemoteBranchName } = require('./utils')
const { onlineDeployUrl } = require('../ik.config')

const maxChangesLimit = 100

const exec = shellWrapper('exec', 'git 操作失败！')

const TEST = 'test'
const GRAY = 'gray'
const PROD = 'master'

const PROMPT_LIST = [{
  type: 'input',
  message: '输入项目名称:',
  name: 'project'
}, {
  type: 'input',
  message: '请输入发布内容:',
  name: 'desc'
}]

// 开发分支提交
const repoName = getRepoName()

/**
 * @function git status的输出
 */
const getGitStatusStdout = () => {
  return exec('git status --porcelain', { silent: true }).stdout
}

/**
 * @function 开发分支提交
 */
const commitCurrentBranch = async (message, branch) => {
  const currentBranch = getBranchName()
  const repoName = getRepoName()
  // 当前分支是目标分支时，不执行任何操作
  if (currentBranch !== branch) {
    const gitStatusOutput = getGitStatusStdout()
    if (gitStatusOutput) {
      const modifyNums = gitStatusOutput.split('\n').filter(Boolean).length
      const maxCommitNum = maxChangesLimit >= 0 ? maxChangesLimit : Infinity
      if (maxCommitNum < modifyNums) { // 修改数大于限制不提交
        logError(`${repoName}仓库 本次提交变更文件数量： ${modifyNums} 个， 大于提交限制 ${maxChangesLimit} 个 ，请review后再次提交！若手动提交后果自负！`) // 直接中断进程
        process.exit(1)
      }

      exec('git add .', { silent: true })
      exec(`git commit -m "${message.project} - ${message.desc}"`, { silent: true })
      // 如果是新建的分支就不执行 git pull 操作了
      if (getRemoteBranchName()) {
        exec('git pull', { silent: true })
      }
      exec(`git push origin ${currentBranch}`, { silent: true })
      logSuccess(`推送代码到 ${repoName} 仓库 ${currentBranch} 分支成功`)
    } else {
      logWarning(`${repoName} 仓库 ${currentBranch} 分支未检测到有变更文件`)
    }
  }
}

/**
 * @function 合并代码到目标分支
 * 1. 当前在开发分支，则切换到目标分支，执行 merge 操作
 * 2. 当前处在目标分支，则需要手动选择开发分支
 */
const mergeCodeToTargetBranch = async (message, branch) => {
  const currentBranch = getBranchName()
  let originBranch

  if (currentBranch === branch) {
    // 当前处在目标分支，则需要手动选择开发分支
    logSuccess('当前处于目标分支：', branch)
    const gitStatusOutput = getGitStatusStdout() // git status的输出
    if (gitStatusOutput) {
      exec('git add .')
      exec(`git commit -m "${message.project} - ${'处理合并冲突'}"`, { silent: true })
      exec('git pull', { silent: true })
      exec(`git push origin ${currentBranch}`, { silent: true })
      logSuccess(`推送代码到 ${repoName} 仓库 ${currentBranch} 分支成功`)
    }
    const list = {
      name: 'branch',
      message: '请选择你的开发分支',
      type: 'list',
      choices: getLocalBranchList().filter(i => i !== PROD && i !== TEST && i !== GRAY)
    }
    originBranch = await inquirer.prompt(list).then(res => res.branch)
  } else {
    // 当前在开发分支，则切换到目标分支
    originBranch = currentBranch
    exec(`git pull origin ${currentBranch}`, { silent: true })
    exec(`git checkout ${branch}`, { silent: true })
    logSuccess('切换分支至目标分支：', branch)
  }

  // 拉取开发分支代码
  exec(`git pull origin`, { silent: true })
  // 合并开发分支代码
  const mergeStdout = shelljs.exec(`git merge ${originBranch}`).stdout

  if (/CONFLICT/.test(mergeStdout)) {
    logError('文件有冲突！请解决冲突、请解决冲突、请解决冲突后再执行该命令')
    process.exit(1)
  }

  return originBranch
}

/**
 * @function 在目标分支打包
 */
const buildWithinTargetBranch = async (branch) => {
  let buildRes
  switch (branch) {
    case TEST:
    case GRAY:
      buildRes = shelljs.exec('npm run build:test')
      break
    case PROD:
      buildRes = shelljs.exec('npm run build')
      break
    default:
      throw new Error('未执行构建代码')
  }

  if (buildRes.stderr.indexOf('Error:') > -1) {
    logError('打包异常！！')
    return Promise.reject(new Error())
  } else {
    logSuccess('打包完成！')
    return Promise.resolve()
  }
}

/**
 * @function 提交目标分支
 */
const commitTargetBranch = async (message, branch) => {
  const currentBranch = getBranchName()

  // 当前分支是目标分支时才继续执行
  if (currentBranch === branch) {
    const gitStatusOutput = getGitStatusStdout() // git status的输出
    if (gitStatusOutput) {
      exec('git add .', { silent: true })
      exec(`git commit -m "${message.project} - ${message.desc}"`, { silent: true })
      exec('git pull', { silent: true })
      exec(`git push origin`, { silent: true }) // 出现过push错的情况
      logSuccess(`推送代码到 ${repoName} 仓库 ${currentBranch} 分支成功`)
    } else {
      logWarning(`${repoName}仓库 未检测到有变更文件`)
    }
  }
}

/**
 * @function 执行 ik-deploy
 */
const deploy = (env) => {
  if (env && env !== PROD) {
    // 设置用于 ik-deploy 配置文件的环境变量
    process.env.DEPLOY_ENV = env
    shelljs.exec('ik-deploy')
  }
}

/**
 * @function 从目标分支合并代码
 */
const mergeCodeFromOriginTarget = async (branch) => {
  const currentBranch = getBranchName()

  if (currentBranch !== branch) {
    const mergeStdout = exec(`git merge origin/${branch}`).stdout
    if (/CONFLICT/.test(mergeStdout)) {
      logError('文件有冲突！请解决冲突、请解决冲突、请解决冲突后再执行该命令')
      process.exit(1)
    }
    return Promise.resolve()
  } else {
    return Promise.reject(new Error())
  }
}

/**
 * 自动发布**测试环境**
 * 大致流程如下
 *                 输入 GIT 提交信息
 *                        |
 *                当前分支是否是开发分支？
 *               /                   \
 *              /                     \
 *             /                       \
 *        开发分支（Y）                测试分支（N）
 *            |                         |
 *          提交代码                   提交代码
 *            |                         |
 *   合并到test分支，是否有冲突？     列表选择开发分支
 *       /           \                  |
 *     无冲突（N）   有冲突（Y）       构建、提交
 *       |            |                 |
 *   构建、提交  中断，处理冲突        切回开发分支
 *       |            |                 |
 *   切回开发分支  重新执行本脚本          发布
 *       |
 *      发布
 */
async function runDEV (targetBranch) {
  // 开发分支提交 -> 合并代码到 test 或者 gray 分支 -> test 或者 gray 分支构建、提交 -> 切回开发分支 -> 发布系统发布（ik-deploy 自动发布）

  const currentBranch = getBranchName()

  if ((currentBranch === 'test' && targetBranch === GRAY) || (currentBranch === 'gray' && targetBranch === TEST)) {
    logError(`不能把 ${currentBranch} 分支代码，合并到 ${targetBranch} 分支！！！`)
    process.exit(1)
  }

  // 开发分支
  let originBranch

  try {
    // 获取git提交信息
    const message = await inquirer.prompt(PROMPT_LIST)

    // 开发分支提交
    await commitCurrentBranch(message, targetBranch)

    // 合并代码到 test / gray 分支，这里能获取到开发分支名称
    originBranch = await mergeCodeToTargetBranch(message, targetBranch)

    //  test / gray 分支构建
    await buildWithinTargetBranch(targetBranch)

    // test / gray 分支提交
    await commitTargetBranch(message, targetBranch)

    // 切回开发分支
    exec(`git checkout ${originBranch}`)

    // 发布系统发布（ik-deploy 自动发布）
    deploy(targetBranch)
  } catch (e) {
    console.error(e)
  }
}

/**
 * 自动发布**上线**
 * 大致流程如下：
 *            输入 GIT 提交信息
 *                   |
 *              开发分支提交
 *                   |
 *   开发分支合并 origin/master 代码，是否有冲突？
 *          /                     \
 *        无冲突（N）             有冲突（Y）
 *          |                      |
 *   开发分支构建、提交        中断，手动处理冲突
 *          |                      |
 *  手动提 merge request       重新执行本脚本
 *          |
 *   手动去发布系统发布
 */
async function runPROD () {
  // 开发分支提交 -> 合并 master 分支代码 -> 开发分支构建、提交 -> 提 merge requeset -> 手动去发布系统发布

  const currentBranch = getBranchName()

  if (currentBranch === PROD || currentBranch === TEST || currentBranch === GRAY) {
    logError(`请不要在 ${currentBranch} 分支执行上线流程！！！`)
    process.exit(1)
  }

  // 设置目标分支
  const targetBranch = 'master'

  try {
    // 获取git提交信息
    const message = await inquirer.prompt(PROMPT_LIST)

    // 开发分支提交
    await commitCurrentBranch(message, targetBranch)

    // 合并 master 分支代码
    await mergeCodeFromOriginTarget(targetBranch).catch(() => {
      logError(`请不要在 master 分支执行此脚本！！！`)
      process.exit(1)
    })

    // 开发分支构建
    await buildWithinTargetBranch(targetBranch)

    // 开发分支提交
    await commitTargetBranch(message, currentBranch)

    // 提 merge requeset
    logSuccess('代码提交完成，请提交 merge request 后，再发布！！！')
    open(getNewMergeRequestUrl(currentBranch))
    console.log(`发布系统地址： ${onlineDeployUrl}`)
  } catch (e) {
    console.error(e)
  }
}

async function run () {
  const list = {
    name: 'name',
    message: '请选择你要发布的环境',
    type: 'list',
    choices: [TEST, GRAY, PROD]
  }
  const env = await inquirer.prompt(list)

  switch (env.name) {
    case TEST:
      runDEV(TEST)
      break
    case GRAY:
      runDEV(GRAY)
      break
    case PROD:
      runPROD()
      break
    default:
      break
  }
}

run()
