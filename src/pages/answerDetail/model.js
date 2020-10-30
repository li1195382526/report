import * as detailApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'answerDetail',
  state: {
    detail: [],
    periods: [],
    resList: {},
    canEdit:false,
    finishTime:''
  },

  effects: {
    * getDetail({ payload: value, url }, { call, put }) {
      const data = yield call(detailApi.getDetail, value, url);
      if(data.statusCode == 404) {
        yield put({
          type: 'save',
          payload: {
            detail: [],
            canEdit: false,
            finishTime: '此周期未'
          }
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            detail: data.data.anw,
            canEdit: data.data.canEdit,
            finishTime: data.data.finishTime
          }
        });
      }
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
