import Taro from '@tarojs/taro';
import * as templateApi from './service';

export default {
  namespace: 'templateText',
  state: {
    templist: [],
    current: 1,
    pageSize: 15,
    templistTotal: 0
  },

  effects: {
    * getTemplist({ payload: values }, { call, put, select }) {
      let { templist } = yield select(state => state.templateText);
      const { data } = yield call(templateApi.getTemplist, values);
      yield put({
        type: 'save',
        payload: { templist: templist.concat(data.data), templistTotal: data.total }
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
