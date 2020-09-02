import Taro from '@tarojs/taro';
import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    qtnList: [],
    page: 1,
    qtnTypes: '',
    qtnName: '',
    projectExist: false,
  },

  effects: {
    * getQuestionnaireName({ payload: values, token }, { call, put }) {
      const { data } = yield call(homeApi.getQuestionnaireName, values, token);

      yield put({
        type: 'save',
        payload: {
          qtnName:data.message.data.qtnName,
        }
      });

    },
    * getQuestionaireTypes({ token }, { call, put }) {
      const { data } = yield call(homeApi.getQuestionaireType, {}, token);

      let qtnTypes = data.message.data.list
      var dic = new Array();
      qtnTypes.forEach(item => {
        dic[item.type] = item.typeName
      })

      yield put({
        type: 'save',
        payload: {
          qtnTypes: dic,
        }
      });
    },
    * getQuestionaires({ payload: values, token }, { call, put, select }) {
      const { page, qtnList } = yield select(state => state.home);
      const { data } = yield call(homeApi.getQuestionaires, values, token);

      yield put({
        type: 'save',
        payload: {
          qtnList:
            page > 1 ? [...qtnList, ...data.message.data.list] : data.message.data.list,
        }
      });

    },
    * verifyUserExistProjects({ token }, { call, put }) {
      const { data } = yield call(homeApi.verifyUserExistProjects, {}, token);
      yield put({
        type: 'save',
        payload: {
          projectExist: data.message.data.exist,
        }
      });
    },
    * updateQtnStatus({ payload: values, index, token }, { call, put, select }) {
      const { qtnList } = yield select(state => state.home);
      yield call(homeApi.updateQtnStatus, values, token);

      qtnList[index].status = values.qtnStatus
      
      yield put({
        type: 'save',
        payload: {
          qtnList: qtnList ,
        }
      });
    },
    * logout(_, { put }) {

      yield put({
        type: 'common/save',
        payload: {
          token: '',
          userinfo: '',
          logintime: ''
        }
      });

      Taro.removeStorageSync('token')
      Taro.redirectTo({
        url: '/pages/login/index',
      })

    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
