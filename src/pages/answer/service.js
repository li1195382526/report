import {syncAction} from '../../utils/request';

// eslint-disable-next-line import/prefer-default-export
export const getQuestionner = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

export const subMitAnswer = ( data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url,
});

//修改填报
export const modifySubmit = ( data,token,url) => syncAction({
  data,
  method: "PUT",
  token,
  url,
});

export const joinReport = ( data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url,
});

export const getNamelist = ( url) => syncAction({
  method: "Get",
  url,
});

export const getAnswer = ( data,token,url) => syncAction({
  data,
  method: "GET",
  token,
  url,
});

//获取微信手机号wxMobilelogin
export const wxMobilelogin = (data) => syncAction({
  data,
  method: "POST",
  url:'/v3/login/wxMobilelogin'
});
