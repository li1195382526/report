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