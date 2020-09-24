// import * as dataListApi from './service';
import Taro from '@tarojs/taro';

export default {
    namespace: 'nameList',
    state: {
        tableList: [{
            listIndex: 0,
            name: '',
            limit: [],
            status: 1
        }]
    },

    effects: {
        * release({ payload: value, token, url, now, end }, { call, put, select }) {
            const { data } = yield call(dataListApi.getName, token, url);
            let { releaseData } = yield select((state) => state.dataList);
            yield put({
                type: 'save',
                payload: {
                    releaseData: releaseData.concat(data.data),
                }
            });
            if (now == end) {
                Taro.redirectTo({
                    url: '/pages/nameList/index'
                })
            }
        },
        * uploadData({ payload: value }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    tableList: value
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
