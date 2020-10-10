import Taro from '@tarojs/taro';
import * as homeApi from './service';
import { noConsole, HTTP_STATUS } from '../../config';

export default {
  namespace: 'home',
  state: {
    createList:[],
    page: 1,
    isPersonal:0,//0首页登录，1，个人中心等，2，获取名单库登录
    Participantlist: []
  },

  effects: {
    * wxLogin({ payload: values }, { call, put }) {
      const { data } = yield call(homeApi.wxLogin, values);
      yield put({
        type: 'wechatLogin',
        payload: data
      })
    },
    * wechatLogin({ payload: data }, { put,select }) {
      const { isPersonal } = yield select(state => state.home);
      if (data.status == HTTP_STATUS.SUCCESS && data.data.token) {
        let token = data.data.token
        let user = data.data.user
        let now = new Date().valueOf()
        Taro.setStorage({
          key: "token",
          data: token
        })
        Taro.setStorage({
          key: "userinfo",
          data: data.data.user
        })
        Taro.setStorage({
          key: "mobile",
          data: data.data.mobile
        })
        Taro.setStorage({
          key: "logintime",
          data: now
        })
        Taro.atMessage({
          'message': '登录成功',
          'type': 'success',
          'duration': 1000
        })

        yield put({
          type: 'save',
          payload: {
            token: token,
            userinfo: user
          }
        });

        yield put({
          type: 'common/save',
          payload: {
            token: token,
            userinfo: user,
            logintime: now
          }
        });
        if(isPersonal === 0){
          setTimeout(() => {
            Taro.redirectTo({
              url: '../home/index'
            })
          }, 100);
        }else if(isPersonal === 2){
          setTimeout(() => {
            Taro.redirectTo({
              url: '../dataList/index'
            })
          }, 100);
        }else{
          setTimeout(() => {
            Taro.redirectTo({
              url: '../personalCenter/index'
            })
          }, 100);
        }
        
      } else if(data.status == HTTP_STATUS.SUCCESS && !data.data.token) {
        Taro.navigateTo({
          url: '/pages/home/wxlogin?userId=' + data.data.userId
        })
      } else {
        Taro.atMessage({
          'message': data.message || '登录失败',
          'type': 'error',
          'duration': 5000
        })
      }
    },
    * getCycle({ payload: token,url }, { call, put, select }) {
      const { data } = yield call(homeApi.getCycle, token, url);
      yield put({
        type: 'save'
      });
    },
    * copyReport({ payload: values, token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(homeApi.copyReport, values, token, url);

      yield put({
        type: 'save',
      });
    },
    * deleteReport({ payload: values, token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(homeApi.deleteReport, values, token, url);

      yield put({
        type: 'save',
      });
    },
    * getOwnerlist({ payload: values, token }, { call, put, select }) {
      console.log(values)
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(homeApi.getOwnerlist, values, token);

      yield put({
        type: 'save',
        payload: {
          createList:data.data,
        }
      });
    },

    * bindPhone({ payload: values }, { call, put }) {
      const { data } = yield call(homeApi.bindPhoneNum, values);
      console.log(data)
      yield put({
        type: 'wechatLogin',
        payload: data
      })
    },
    * wxMobilelogin({ payload: values,token }, { call, put }) {
      const { data } = yield call(homeApi.wxMobilelogin, values,token);
      Taro.setStorage({
        key: "wxMobile",
        data: data.data.mobile
      })
    },
    * getParticipantlist({ payload: values,token,url }, { call, put }) {
      const { data } = yield call(homeApi.getParticipantlist, token,url);
      yield put({
        type: 'save',
        payload: {Participantlist: data}
      })
    },
    * closeReport({ payload: values,token,url }, { call, put }) {
      const { data } = yield call(homeApi.closeReport, token, url);
      yield put({
        type: 'save'
      })
      if(data.status == 200) {
        Taro.atMessage({
          'message': '操作成功，已关闭填报',
          'type': 'success',
          'duration': 2000
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
