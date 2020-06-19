import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ENVLIST,
  SAVE_CONFIG,
  SAVE_CREATE_ENV,
} from './type';
import S from './../apis';

export const saveCreate = (payload) => ({ type: SAVE_CREATE, payload });
export const saveTable = (payload) => ({ type: SAVE_TABLE, payload });
export const saveEnvList = (payload) => ({ type: SAVE_ENVLIST, payload });
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
export const saveSearchParams = (payload) => ({
  type: SAVE_SEARCH_PARAMS,
  payload,
});

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { dispatcher: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  };
  const formatParams = {
    ...params,
    page: params.page - 1
  }
  S.getDataList(formatParams).then((res) => {
    const { data } = res
    const { ev_list: evList, total_count: count } = data || {}
    dispatch(
      saveTable({
        data: evList || [],
        total: +count || 0,
      })
    );
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 新增
export const add = (payload) => async (dispatch, getState) => {
  const {
    ev_type: evType,
    ev_name: evName,
    ev_desc: evDesc,
    env,
    before_verify: beforeVerify,
    before_custom_verify: beforeCustomVerify,
    now,
    after_fe: afterFe,
  } = payload;
  const addParams = {
    ev_type: evType,
    ev_name: evName,
    ev_desc: evDesc,
  };
  const { data } = await S.add(addParams);
  const { id } = data || {}
  if (!id) return
  const detail = env.map(x => ({
    ev_id: id,
    env: x,
    before_verify: beforeVerify,
    before_custom_verify: beforeCustomVerify,
    now,
    after_fe: afterFe,
  }))
  S.addDetail({ detail }).then(() => {
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};

// 更新
export const update = (payload) => async (dispatch, getState) => {
  S.update(payload).then(() => {
    // 刷新列表
    dispatch(getTableList());
  });
};

// 启用全部
export const postStartAll = (payload) => async (dispatch, getState) => {
  S.postStartAll(payload).then((res) => {
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

// dispatcher-before_verify列表查询接口
export const getConfig = () => async (dispatch, getState) => {
  S.getConfig().then((res) => {
    const { data } = res;
    // 刷新列表
    dispatch(saveConfig(data || []));
  });
};

export const del = payload => async (dispatch, getState) => {
  S.del(payload).then(() => {
    // 刷新列表
    dispatch(getTableList());
  });
};
