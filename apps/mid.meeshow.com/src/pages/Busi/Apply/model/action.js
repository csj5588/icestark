import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_APPLY_ROLE_LIST,
} from './type';
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });
export const saveRoleList = payload => ({ type: SAVE_APPLY_ROLE_LIST, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { apply: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  S.getDataList(params).then(res => {
    const { data = {} } = res;
    dispatch(saveTable({
      data: data.applications || [],
      total: data.applications.length,
    }));
    message.success('查询成功');
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  S.add(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};

// 获取角色列表
export const getRoleList = payload => async (dispatch, getState) => {
  S.getRoleList(payload).then(({ data }) => {
    const { list } = data;
    dispatch(saveRoleList(list));
  });
};

export const postUserModify = payload => async (dispatch, getState) => {
  await S.postUserModify(payload).then((res) => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
  });
  return true;
};

export const del = payload => async (dispatch, getState) => {
  S.del(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
  });
};
