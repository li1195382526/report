import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    token: Taro.getStorageSync('token'),
    userinfo: Taro.getStorageSync('userinfo'),
    logintime: Taro.getStorageSync('loginTime'),
    wxInfo:Taro.getStorageSync('wxInfo'),
    mobile:Taro.getStorageSync('mobile')
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
