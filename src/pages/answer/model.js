import * as answerApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'answer',
  state: {
    "info": {},
    "questionnaire":{},
    "anw":{},
    "res": {} // 进入填报的返回结果
  },

  effects: {
    * getQuestionner({ payload: token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(answerApi.getQuestionner, token, url);
      yield put({
        type: 'save',
        payload: {
          questionnaire:data.questionnaire,
          info:data.info,
          res: {}
        }
      });
    },
    * subMitAnswer({ payload: values,token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(answerApi.subMitAnswer, values,token, url);
      yield put({
        type: 'save',
      });
      if(data.status == 200) {
        Taro.navigateTo({
          url: '/pages/submits/index'
        })
      } else {
        Taro.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1500
        })
      }
    },
    * joinReport({ payload: values,token,url }, { call, put }) {
      const { data } = yield call(answerApi.joinReport, values,token, url);
      yield put({
        type: 'save',
        payload: {
          res: data
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
