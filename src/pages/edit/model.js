import * as editApi from './service';

export default {
  namespace: 'edit',
  state: {
    "info": {},
    "questionnaire":{},
    isChange:'',
    qtnStatus:'',
    message:''
  },

  effects: {
    * getQuestionner({ payload: token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(editApi.getQuestionner, token, url);
      yield put({
        type: 'save',
        payload: {
          questionnaire:data.questionnaire,
          info:data.info
        }
      });
    },
    * saveQtn({ payload: values,token }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(editApi.saveQtn, values,token);
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          //questionnaire:data.questionnaire,
          //info:data.info
        }
      });
    },
    * publish({ payload: values,token,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(editApi.publish,values, token, url);
      yield put({
        type: 'save',
        payload:{
          qtnStatus:data.status,
          message:data.message
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
