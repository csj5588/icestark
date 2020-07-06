import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ENVLIST,
  SAVE_CONFIG,
  SAVE_CREATE_ENV,
  SAVE_CREATE_ENV_PARAMS,
  INIT_CREATE_ENV_PARAMS,
  SAVE_ALL_ENVLIST,
} from './type';
import S from './../apis';

export const saveCreate = (payload) => ({ type: SAVE_CREATE, payload });
export const saveTable = (payload) => ({ type: SAVE_TABLE, payload });
export const saveEnvList = (payload) => ({ type: SAVE_ENVLIST, payload });
export const saveAllEnvList = (payload) => ({ type: SAVE_ALL_ENVLIST, payload });
export const saveConfig = (payload) => ({ type: SAVE_CONFIG, payload });
export const saveCreateParams = (payload) => ({
  type: SAVE_CREATE_PARAMS,
  payload,
});
export const initCreateParams = (payload) => ({
  type: INIT_CREATE_PARAMS,
  payload,
});
export const saveCreateEnv = (payload) => ({ type: SAVE_CREATE_ENV, payload });
export const saveCreateEnvParams = (payload) => ({
  type: SAVE_CREATE_ENV_PARAMS,
  payload,
});
export const initCreateEnvParams = (payload) => ({
  type: INIT_CREATE_ENV_PARAMS,
  payload,
});
export const saveSearchParams = (payload) => ({
  type: SAVE_SEARCH_PARAMS,
  payload,
});

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { dispatcherDetail: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  };
  const { id, curApp } = params
  const [dataRes, envsRes] = await Promise.all([S.getData({ id }), S.getEnvList({ app_key: curApp })])
  const { data } = dataRes
  const { detail = [] } = data || {}
  const detailEnvlist = (detail && detail.map(x => x.env)) || []
  const { data: envsData } = envsRes
  // 将环境列表和详情里面的环境进行比较 取差集
  const { envs = [] } = envsData || {};
  const allEnvList = envs.map((x) => ({
    env: x.env,
    name: x.item && x.item.name,
  }));
  const envList = envs.filter(y => !detailEnvlist.includes(y.env)).map((x) => ({
    env: x.env,
    name: x.item && x.item.name,
  }));
  // 存储详情数据 和 环境列表
  dispatch(saveSearchParams(params));
  dispatch(saveAllEnvList(allEnvList));
  dispatch(saveEnvList(envList));
  dispatch(saveTable(data || {}));
};

// 编辑保存
export const update = (payload) => async (dispatch, getState) => {
  const { dispatcherDetail: state } = getState();
  const { data: { id } } = state
  if (!payload || !payload.length) return
  // 区分有id的配置需要更新接口，没有id的配置 走新增接口
  const updataArr = payload.filter(item => item.id)
  const addArr = payload.filter(item => !item.id)
  if (updataArr.length > 0 && addArr.length > 0) {
    await Promise.all([S.uplate({ detail: updataArr }), S.addDetail({ detail: addArr })])
  } else if (updataArr.length > 0) {
    await S.uplate({ detail: updataArr })
  } else {
    await S.addDetail({ detail: addArr })
  }
  message.success('操作成功')
  dispatch(getTableList({ id }))
};

// 环境列表/信息查询接口
export const getEnvList = (payload) => async (dispatch, getState) => {
  await S.getEnvList(payload).then((res) => {
    const { data } = res;
    const { envs = [] } = data || {};
    // 比较差值
    const { dispatcherDetail: state } = getState();
    const { data: envData } = state
    const { detail = [] } = envData || {}
    const detailEnvlist = (detail && detail.map(x => x.env)) || []
    const envListFilter = envs.filter(y => !detailEnvlist.includes(y.env)).map((x) => ({
      env: x.env,
      name: x.item && x.item.name,
    }));
    dispatch(saveEnvList(envListFilter));
  });
};

// dispatcherDetail-before_verify列表查询接口
export const getConfig = () => async (dispatch, getState) => {
  S.getConfig().then((res) => {
    const { data } = res;
    // 刷新列表
    dispatch(saveConfig(data || []));
  });
};
