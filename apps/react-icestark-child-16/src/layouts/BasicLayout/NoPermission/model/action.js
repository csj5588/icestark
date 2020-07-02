import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
} from './type';
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  await S.add(payload).then(() => {
    // 刷新列表
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};
