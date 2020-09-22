import * as answerApi from './service';

export default {
  namespace: 'answer',
  state: {
    "info": {},
    "questionnaire":{},
  },

  effects: {
    * getQuestionner({ payload: token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(answerApi.getQuestionner, token, url);
      yield put({
        type: 'save',
        payload: {
          questionnaire:data.questionnaire,
          info:data.info
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
