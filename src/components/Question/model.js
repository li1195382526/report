export default {
  namespace: 'question',
  state: {
    id:2,
    questionnaire:{
      "id": "0",
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
      "optList": [{
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
    "optList": [{
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
}
],
  }],
    }
  },

  effects: {
   
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
