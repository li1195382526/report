import * as Request from '../../utils/request';

export const login = (data) => Request.syncAction({
  method: 'UserLogin.login',
  type: 'user',
  data
});

export const wxLogin = (data) => Request.syncAction({
  url: '/thirdLogin/user/wxLogin',
  method: 'user.wxLogin',
  type: 'user',
  data
});

export const bindPhoneNum = (data) => Request.syncAction({
  url: '/thirdLogin/user/wxBind',
  method: 'user.wxBind',
  type: 'user',
  data
})