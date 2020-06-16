/**
 *  @name 项目名称
 *  @author 开发人员
 *  @date 开发时间
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=
 */

import user from 'utils/user';
import { Message } from 'antd';
import srcConfig from 'src/config';
import {
  getRequestsByRoot,
  getMessageDecorator,
  serviceHocs,
} from 'axios-service';

import { mockAdd, mockDelete, mockGetDataList } from './../mock';

const ticket = user.getToken();
const root = srcConfig.APIS.root;

const { getErrorMsg } = serviceHocs;
const { get, post, postXForm } = getRequestsByRoot({ root });

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({
  success: showSuccess,
  error: showErrorMessage,
});
const errorMessageDecorator = messageDecorator({
  errorMsg: getErrorMsg('接口响应异常，请联系管理员'),
});

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：查询、导出
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @errorMessageDecorator
  getDataList = get('/api_web/v1/controlcenter/fps/serviceinfo/list/get');

  /**
   *  接口：新增
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockAdd
  @errorMessageDecorator
  add = post('/api_web/v1/controlcenter/fps/serviceinfo/multi/add');

  /**
   *  接口：编辑
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockAdd
  @errorMessageDecorator
  updata = post('/api_web/v1/controlcenter/fps/serviceinfo/uri/update');

  /**
   *  接口：删除
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @errorMessageDecorator
  del = post('/api_web/v1/controlcenter/fps/serviceinfo/del');

  /**
   *  接口：恢复
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @errorMessageDecorator
  recover = post('/api_web/v1/controlcenter/fps/serviceinfo/recover');

  /**
   *  接口：发布domains
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @errorMessageDecorator
  serviceEnable = post('/api_web/v1/controlcenter/fps/serviceinfo/url/enable');

  /**
   *  接口：dispatcher-全部启用接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({
    successMsg: showSuccess('操作成功'),
    errorMsg: showErrorMessage(),
  })
  postStartAll = post('/api_web/v1/controlcenter/fps/serviceinfo/start_all');

  /**
   *  接口：环境列表/信息查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({ errorMsg: showErrorMessage() })
  getEnvList = get('/api_web/v1/controlcenter/business/app/env/list/get');
}

export default new Apis();
