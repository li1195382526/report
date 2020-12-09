import {syncAction} from '../../utils/request';

export const getQuestionner = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

//保存问卷
export const saveQtn = (data,token) => syncAction({
  url: '/v3/report/save',
  method: 'POST',
  token,
  type: 'user',
  data
});

//发布填报publish
export const publish = ( data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url,
});

//获取二维码
export const getWXCode = ( data,url) => syncAction({
  data,
  method: "POST",
  url,
});

export const getTemplate = (url) => syncAction({
  method: "GET",
  url,
});