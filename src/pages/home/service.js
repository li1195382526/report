import {syncAction} from '../../utils/request';

const QUESTIONNAIRE = 'questionnaire'
const INVITION = 'invition'
const PROJECT = 'project'

//获取创建填报的列表
export const getOwnerlist = (data,token,url) => syncAction({
  data,
  method: "POST",
  token
});

export const getCycle = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

export const wxLogin = (data) => syncAction({
  url: '/thirdLogin/user/wxLogin',
  method: 'user.wxLogin',
  type: 'user',
  data
});