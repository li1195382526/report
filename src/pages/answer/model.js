import * as answerApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'answer',
  state: {
    "info": {},
    "questionnaire":{},
    "anw":{},
    "res": {}, // 进入填报的返回结果
    "namelist": [],
    "noModify":false
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
        }
      });
    },
    * subMitAnswer({ payload: values,token,url, reportId,period,canEdit }, { call, put }) {
      const { data } = yield call(answerApi.subMitAnswer, values,token, url);
      yield put({
        type: 'save',
      });
      if(data.status == 200) {
        Taro.redirectTo({
          url: `/pages/submits/index?reportId=${reportId}&period=${period}canEdit=${canEdit}`
        })
      } else {
        Taro.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1500
        })
      }
    },
    * modifySubmit({ payload: values,token,url, reportId, period, canEdit }, { call, put }) {
      const { data } = yield call(answerApi.modifySubmit, values,token, url);
      yield put({
        type: 'save',
      });
      if(data.status == 200) {
        Taro.navigateTo({
          url: `/pages/submits/index?reportId=${reportId}&period=${period}&canEdit=${canEdit}`
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
    * getNamelist({ payload: values, url }, { call, put }) {
      const { data } = yield call(answerApi.getNamelist, url);
      yield put({
        type: 'save',
        payload: {
          namelist: data
        }
      });
    },
    * getAnswer({ payload: values,token, url }, { call, put }) {
      const { data } = yield call(answerApi.getAnswer,values,token, url);
      yield put({
        type: 'save',
        payload: {
          anw: data
        }
      });
    },
    * wxMobilelogin({ payload: values }, { call, put }) {
      const { data } = yield call(answerApi.wxMobilelogin, values);
      Taro.setStorage({
        key: "wxMobile",
        data: data.data.mobile
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
