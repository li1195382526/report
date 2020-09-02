import { syncAction } from '../../utils/request';

const INVITION = 'invition'

//状态验证
export const statusCheck = (data, token) => syncAction({
  method: 'InvitationManager.statusCheck',
  type: INVITION,
  data,
  token
});

//获取唯一限制信息
export const getLimitConstraints = (data, token) => syncAction({
  method: 'InvitationManager.getLimitConstraints',
  type: INVITION,
  data,
  token
});

//获取样本需求数据
export const getPanelDemand = (data, token) => syncAction({
  method: 'PanelQuota.getPanelDemand',
  type: INVITION,
  data,
  token
});

//开始收集
export const beginRetrieve = (data, token) => syncAction({
  method: 'InvitationManager.beginRetrieve',
  type: INVITION,
  data,
  token
});

//获取问卷链接和二维码地址
export const getWebLink = (data, token) => syncAction({
  method: 'QtnInvitationLink.getWebLink',
  type: INVITION,
  data,
  token
});

//提交样本需求数据
export const updatePanelDemand = (data, token) => syncAction({
  method: 'PanelQuota.updatePanelDemand',
  type: INVITION,
  data,
  token
});

//提交唯一限制信息
export const updateLimitConstraints = (data, token) => syncAction({
  method: 'InvitationManager.updateLimitConstraints',
  type: INVITION,
  data,
  token
});
