import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_DETAIL,
} from './type';
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });
export const saveDetail = payload => ({ type: SAVE_DETAIL, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { product: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  S.getDataList(params).then(res => {
    const { data = {} } = res;
    dispatch(saveTable({
      data: data.apps || [],
      total: +data.total,
    }));
    message.success('查询成功');
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 详情
export const getDetail = payload => async (dispatch, getState) => {
  S.getDetail(payload).then((res) => {
    // 刷新列表
    dispatch(saveCreateParams(res.data.info))
  });
};

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  await S.add(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};
