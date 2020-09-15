import Taro from '@tarojs/taro';
import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    qtnList: [],
    page: 1,
    qtnTypes: '',
    qtnName: '',
    projectExist: false,
  },

  effects: {
    * wxLogin({ payload: values }, { call, put }) {
      const { data } = yield call(homeApi.wxLogin, values);
      yield put({
        type: 'commonLogin',
        payload: data
      })
    },
    * getCycle({ payload: token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(homeApi.getCycle, token, url);

      yield put({
        type: 'save',
        payload: {
          createList:
            page > 1 ? [...createList, ...data.data] : data.data,
        }
      });
    },
    * getOwnerlist({ payload: values, token }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(homeApi.getOwnerlist, values, token);

      yield put({
        type: 'save',
        payload: {
          createList:
            page > 1 ? [...createList, ...data.data] : data.data,
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
