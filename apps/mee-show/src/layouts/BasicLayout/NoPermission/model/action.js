import { message } from 'antd';
import {
  SAVE_CREATE_PRODUCT,
  SAVE_CREATE_PRODUCT_PARAMS,
  INIT_CREATE_PRODUCT_PARAMS,
  SAVE_DOMAIL,
} from './type';
import S from './../apis';

export const saveCreatePro = payload => ({ type: SAVE_CREATE_PRODUCT, payload });
export const saveCreateProParams = payload => ({ type: SAVE_CREATE_PRODUCT_PARAMS, payload });
export const initCreateProParams = payload => ({ type: INIT_CREATE_PRODUCT_PARAMS, payload });
export const saveDomain = payload => ({ type: SAVE_DOMAIL, payload });

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  await S.add(payload).then(() => {
    // 刷新列表
    // 关闭弹窗
    dispatch(saveCreatePro({ show: false }));
  });
};

export const getDomailList = payload => async (dispatch, getState) => {
  await S.getDomailList(payload).then((res) => {
    const { data } = res
    const { domains = [] } = data || {}
    const [ first = {}, ...other ] = domains || []
    dispatch(saveDomain(first));
  });
};
