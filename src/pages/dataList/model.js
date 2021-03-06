import * as dataListApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'dataList',
  state: {
    dataList:[],
    nameData:[],
    title:'',
    current: 1,
    total: 0,
    response: {},
    releaseData: [] // 引用的名单
  },

  effects: {
    * getNamelist({ payload: value, token, url }, { call, put, select }) {
      const { data } = yield call(dataListApi.getNamelist,value, token, url);
      let { dataList } = yield select((state) => state.dataList);
      if (data.data) {
        yield put({
          type: 'save',
          payload: {
            response: {},
            dataList: dataList.concat(data.data),
            total: data.total
          }
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            response: data
          }
        });
      }
    },
    * create({ payload: value,token,url }, { call, put }) {
      const { data } = yield call(dataListApi.create,value, token, url);
      yield put({
        type: 'save',
      });
      if(data.status == 200) {
        Taro.atMessage({
          'message': '保存成功',
          'type': 'success',
          'duration': 1500
        })
      } else {
        Taro.atMessage({
          'message': '保存失败',
          'type': 'error',
          'duration': 1500
        })
      }
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
    * delList({ payload: token,url }, { call, put }) {
      const { data } = yield call(dataListApi.delList, token, url);
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
          // Taro.redirectTo({
          //   url: '../dataList/index'
          // })
          Taro.navigateBack({
            delta: 1
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
    * release({ payload: value,token,url,now,end }, { call, put, select }) {
      const { data } = yield call(dataListApi.getName, token, url);
      let { releaseData } = yield select((state)=> state.dataList);
      yield put({
        type: 'save',
        payload: {
          releaseData: releaseData.concat( data.data ),
        }
      });
      if(now == end) {
        Taro.hideLoading()
        Taro.navigateBack({delta:1})
      }
    },
    * resetReleaseData({ payload: value }, { put }) {
      yield put({
        type: 'save',
        payload: {
          releaseData: [],
        }
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
