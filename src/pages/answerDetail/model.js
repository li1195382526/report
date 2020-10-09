import * as detailApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'answerDetail',
  state: {
    detail: [{
      "optList": [
        {
          "label": "<p class=\"ql-align-center\">新选项</p>",
          "mySeq": "A1",
          "text": ""
        }
      ],
      "qtDescn": "Q1、单选题center【单选题】",
      "selectType": 0,
      "type": 1
    },
    {
      "optList": [
        {
          "label": "<p class=\"ql-align-justify\">多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify新选项</p>",
          "mySeq": "A1",
          "text": ""
        }
      ],
      "qtDescn": "Q2、多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify多选题justify【多选题】",
      "selectType": 1,
      "type": 1
    },
    {
      "optList": [
        {
          "label": "<p class=\"ql-align-right\">新选项</p>",
          "mySeq": "A2",
          "text": ""
        }
      ],
      "qtDescn": "Q3、reight单选题【单选题】",
      "selectType": 0,
      "type": 1
    }],
  },

  effects: {
    * getDetail({ payload: value, url }, { call, put }) {
      const { data } = yield call(detailApi.getDetail, value, url);
      yield put({
        type: 'save',
        payload: {
          detail: data.data
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
