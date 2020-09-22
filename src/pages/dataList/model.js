import * as dataListApi from './service';
import Taro from '@tarojs/taro';

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
      yield put({
        type: 'save',
        payload: {
          nameData:data.data,
          title:data.title
        }
      });
    },
    * delList({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(dataListApi.delList, value, token, url);
      yield put({
        type: 'save',
      });
      Taro.hideLoading()
      if(data.status == 200) {
        Taro.atMessage({
          'message': '删除成功',
          'type': 'success',
          'duration': 1500
        })
      } else {
        Taro.atMessage({
          'message': '删除失败',
          'type': 'error',
          'duration': 1500
        })
      }
    },
    * uploadData({ payload: value }, { put }) {
      yield put({
        type: 'save',
        payload: {
          nameData: value
        }
      });
    },
    * saveList({ payload: value, url }, { put, call }) {
      const { data } = yield call(dataListApi.saveList, value, url);
      yield put({
        type: 'save'
      });
      if(data.status == 200) {
        Taro.atMessage({
          'message': '保存成功',
          'type': 'success',
          'duration': 1500
        })
        setTimeout(() => {
          Taro.redirectTo({
            url: '../dataList/index'
          })
        }, 500);
      } else {
        Taro.atMessage({
          'message': '保存失败',
          'type': 'error',
          'duration': 1500
        })
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
