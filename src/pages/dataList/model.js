import * as dataListApi from './service';

export default {
  namespace: 'dataList',
  state: {
    dataList:[],
    nameData:[],
    title:''
  },

  effects: {
    * getNamelist({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(dataListApi.getNamelist,value, token, url);
      yield put({
        type: 'save',
        payload: {
          dataList:data.data
        }
      });
    },
    * create({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(dataListApi.create,value, token, url);
      yield put({
        type: 'save',
      });
    },
    * getName({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(dataListApi.getName, token, url);
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          nameData:data.data,
          title:data.title
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
