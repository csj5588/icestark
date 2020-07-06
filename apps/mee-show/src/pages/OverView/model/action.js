import { message } from 'antd';
import {
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ALL_TABLE,
  SAVE_ALL_SEARCH_PARAMS
} from './type';
import S from '../apis';

export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveAllTable = payload => ({ type: SAVE_ALL_TABLE, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });
export const saveAllSearchParams = payload => ({ type: SAVE_ALL_SEARCH_PARAMS, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { overView: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  const formatParams = {
    ...params,
    page_token: params.page_token - 1
  }
  S.getDataList(formatParams).then(res => {
    const { data = {} } = res;
    const { list } = data || {}
    dispatch(saveTable({
      data: list || [],
    }));
    // 回存
    dispatch(saveSearchParams(params));
  });
};

export const getAllTableList = (payload = {}) => async (dispatch, getState) => {
  const { overView: state } = getState();
  const params = {
    ...state.searchAllParams,
    ...payload,
  }
  const formatParams = {
    ...params,
    page_token: params.page_token - 1
  }
  Reflect.deleteProperty(params, 'uid')
  S.getDataList(formatParams).then(res => {
    const { data = {} } = res;
    const { list } = data || {}
    dispatch(saveAllTable({
      data: list || [],
    }));
    // 回存
    dispatch(saveAllSearchParams(params));
  });
};
