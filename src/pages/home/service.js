import {syncAction} from '../../utils/request';

const QUESTIONNAIRE = 'questionnaire'
const INVITION = 'invition'
const PROJECT = 'project'

//获取创建填报的列表
export const getOwnerlist = (data,token) => syncAction({
  data,
  method: "POST",
  token,
  url:'/v3/report/ownerlist'
});

export const getCycle = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

export const wxLogin = (data) => syncAction({
  url: '/v3/login/wxLogin',
  method: 'POST',
  type: 'user',
  data
});

export const bindPhoneNum = (data) => syncAction({
  url: '/v3/login/wxBind',
  method: 'POST',
  type: 'user',
  data,
  formatData: true
})

//复制填报
export const copyReport = (data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url
});

//删除填报deleteReport
export const deleteReport = (data,token,url) => syncAction({
  data,
  method: "DELETE",
  token,
  url
});

//获取微信手机号wxMobilelogin
export const wxMobilelogin = (data,token) => syncAction({
  data,
  method: "POST",
  url:'/v3/user/wxMobilelogin'
});