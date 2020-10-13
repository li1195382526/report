import * as viewDataApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'dataList',
  state: {
    dataList:[],
    nameData:[],
    title:'',
    releaseData: [] // 引用的名单
  },

  effects: {
    * delList({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(viewDataApi.delList, value, token, url);
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
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
