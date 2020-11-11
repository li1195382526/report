import * as editApi from './service';

export default {
  namespace: 'edit',
  state: {
    info: {},
    questionnaire:{},
    isChange:'',
    qtnStatus:'',
    message:'',
    status:'',
    isModify:true,
    response: '',
    code:''
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
      let { info } = yield select(state => state.edit);
      const { data } = yield call(editApi.saveQtn, values,token);
      // console.log(data)
      const id = data.data.id
      if(data.status == 200) {
        info.id = id
      }
      yield put({
        type: 'save',
        payload: {
          status:data.status,
          message:data.message,
          response: data,
          info
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
    * getWXCode({ payload: values,url }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(editApi.getWXCode,values,  url);
      yield put({
        type: 'save',
        payload:{
          code:data.data.code
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
