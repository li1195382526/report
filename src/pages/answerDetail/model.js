import * as detailApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'answerDetail',
  state: {
    detail: [],
    periods: [],
    resList: {}
  },

  effects: {
    * getDetail({ payload: value, url }, { call, put }) {
      const { data } = yield call(detailApi.getDetail, value, url);
      yield put({
        type: 'save',
        payload: {
          detail: data.anw
        }
      });
    },
    * getPeriods({ payload: value, url }, { call, put }) {
      const { data } = yield call(detailApi.getPeriods, url);
      yield put({
        type: 'save',
        payload: {
          periods: data
        }
      });
    },
    * getResList({ payload: value, url }, { call, put }) {
      const { data } = yield call(detailApi.getResList, url);
      yield put({
        type: 'save',
        payload: {
          resList: data
        }
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
