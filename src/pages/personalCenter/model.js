import Taro from '@tarojs/taro';
import * as personApi from './service';

export default {
  namespace: 'person',
  state: {
  },

  effects: {
    * wxLogin({ payload: values }, { call, put }) {
      const { data } = yield call(personApi.wxLogin, values);
      yield put({
        type: 'commonLogin',
        payload: data
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
