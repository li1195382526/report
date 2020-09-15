import * as invitationApi from './service';

export default {
  namespace: 'edit',
  state: {
  },

  effects: {
    * statusCheck({ payload: values, token }, { call, put }) {

      const { data } = yield call(invitationApi.statusCheck, values, token);

      yield put({
        type: 'save',
        payload: {
          qtnStatus: data.message.data.qtnStatus
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
