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
        }]  // 填报名单
    },

    effects: {
        * uploadData({ payload: value }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    tableList: value
                }
            });
        },
        * mergeData({ payload: value }, { put, select }) {
            let { releaseData } = yield select((state)=> state.dataList);
            let { tableList } = yield select((state)=> state.nameList);
            if(releaseData.length) {
                yield put({
                    type: 'save',
                    payload: {
                        tableList: tableList.concat(releaseData)
                    }
                });
            } else {
                yield put({
                    type: 'save'
                });

            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
