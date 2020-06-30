import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ENVLIST,
  SAVE_CREATE_ENV,
  SAVE_CREATE_ENV_PARAMS,
  INIT_CREATE_ENV_PARAMS,
} from './type';
import { ADD } from '../constants/modalTypes'
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveEnvList = (payload) => ({ type: SAVE_ENVLIST, payload });
export const saveCreateEnv = (payload) => ({ type: SAVE_CREATE_ENV, payload });
export const saveCreateEnvParams = (payload) => ({
  type: SAVE_CREATE_ENV_PARAMS,
  payload,
});
export const initCreateEnvParams = (payload) => ({
  type: INIT_CREATE_ENV_PARAMS,
  payload,
});
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { service: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  const fomatParams = {
    ...params,
    page: params.page - 1,
  }
  S.getDataList(fomatParams).then(res => {
    const { data = {} } = res;
    const _data = data.list || [];
    const server = _data.map((x, i) => {
      x.idx = i;
      return x;
    })
    dispatch(saveTable({
      data: server || [],
      config: data.config || {},
      total: +data.total_count || 0,
    }));
    message.success('查询成功');
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 发布禁用地址
export const serviceEnable = payload => async (dispatch, getState) => {
  S.serviceEnable(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // // 关闭弹窗
    // dispatch(saveCreate({ show: false }));
  });
};

// 新增
export const add = payload => async (dispatch, getState) => {
  S.add(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};

// 编辑
export const updata = payload => async (dispatch, getState) => {
  S.updata(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false, type: ADD }));
  });
};

export const del = payload => async (dispatch, getState) => {
  S.del(payload).then(() => {
    message.success('删除成功');
    // 刷新列表
    dispatch(getTableList());
  });
};

export const recover = payload => async (dispatch, getState) => {
  S.recover(payload).then(() => {
    message.success('恢复成功');
    // 刷新列表
    dispatch(getTableList());
  });
};

// 启用全部
export const postStartAll = (payload) => async (dispatch, getState) => {
  S.postStartAll(payload).then((res) => {
    // const { error_msg: errorMsg } = res;
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
  });
};

// 环境列表/信息查询接口
export const getEnvList = (payload) => async (dispatch, getState) => {
  S.getEnvList(payload).then((res) => {
    const { data } = res;
    const { envs = [] } = data || {};
    const envList = envs.map((x) => ({
      env: x.env,
      name: x.item && x.item.name,
    }));
    // 刷新列表
    dispatch(saveEnvList(envList));
  });
};
