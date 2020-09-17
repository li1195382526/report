import * as editApi from './service';

export default {
  namespace: 'edit',
  state: {
    "info": {
      "id": "1",
      "title": "",
      "memo": "",
      "beginTime": "2020-09-10 00:00:00" ,
      "endTime": "2020-10-01 00:00:00",
      "useCount": "0",
      "pnlCount": "0",
      "useNamelist": "1",
      "namelist": [{
        "num": 1,
        "name":"张三",
        "status":1,
        "limit":["13901234567"]
      }],
      "usePeriod": "1",
      "periodType": "1",
      "periodSize": "4",
      "isStrict": "0",
      "isUserLimit": "0",
      "canEdit": "0",
      "needPwd": "0",
      "pwd": "",
      "creatorName": "张老师"
     },
    questionnaire:{
  "name": "填报1",
  "title": "填报1",
  "status": 0 ,
  "pageList": [{
    "qtList": [{
      "type": 1,
      "selectType": 1,
      "disSeq": "Q1",
      "fixSeq": "Q1",
      "mySeq": "Q1",
      "cols": 1,
      "img": "",
      "smax": 4,
      "smin": 1,
      "optlist": [{
        "fixSeq":"A1",
        "position":0,
        "val":1,
        "mySeq":"A1",
        "input":false,
        "fmt":"text",
        "seq":1,
        "img":"",
        "label":"选项1",
        "conf":{},
        "required":false,
        "optQuote":false
      },
      {
        "fixSeq":"A2",
        "position":0,
        "val":1,
        "mySeq":"A2",
        "input":false,
        "fmt":"text",
        "seq":1,
        "img":"",
        "label":"选项2",
        "conf":{},
        "required":false,
        "optQuote":false
      }
    ],
      "seq": "1",
      "text": "选择题",
      "required":false
  },
  {
    "type": 2,
    "selectType": 1,
    "disSeq": "Q2",
    "fixSeq": "Q2",
    "mySeq": "Q2",
    "cols": 1,
    "img": "",
    "smax": 4,
    "smin": 1,
    "optlist": [{
      "fixSeq":"A1",
      "position":0,
      "val":1,
      "mySeq":"A1",
      "input":false,
      "fmt":"text",
      "seq":1,
      "img":"",
      "label":"题目标题",
      "conf":{},
      "required":false,
      "optQuote":false
    }
  ],
    "seq": "1",
    "text": "填空",
    "required":false
}
],
  }],
    }
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
    * save({ payload: values,token }, { call, put, select }) {
      const { page, createList } = yield select(state => state.home);
      const { data } = yield call(editApi.save, values,token);
      yield put({
        type: 'save',
        payload: {
          //questionnaire:data.questionnaire,
          //info:data.info
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
