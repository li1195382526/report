import * as projectApi from './service';

export default {
  namespace: 'project',
  state: {
    prjList: [],
    prjQtnList: [],
    page: 1,
    qtnPage: 1,
    qtnTypes: '',
    prjFlag: 0,
    isCreator: false,
    isUpdate: false,
  },

  effects: {
    * queryProjects({ payload: values, token }, { call, put, select }) {
      const { page, prjList } = yield select(state => state.project);
      const { data } = yield call(projectApi.queryProject, values, token);

      yield put({
        type: 'save',
        payload: {
          prjList:
            page > 1 ? [...prjList, ...data.message.data.list] : data.message.data.list,
        }
      });

    },
    * queryQuestionnaire({ payload: values, token }, { call, put, select }) {
      const { qtnPage, prjQtnList } = yield select(state => state.project);
      const { data } = yield call(projectApi.queryQuestionnaire, values, token);

      yield put({
        type: 'save',
        payload: {
          prjFlag: data.message.data.prjFlag,
          isCreator: data.message.data.isCreator,
          isUpdate: data.message.data.isUpdate,
          prjQtnList:
          qtnPage > 1 ? [...prjQtnList, ...data.message.data.list] : data.message.data.list,
        }
      });

    },
    * getQuestionaireTypes({ token }, { call, put }) {
      const { data } = yield call(projectApi.getQuestionaireType, {}, token);

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
  },
  

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
