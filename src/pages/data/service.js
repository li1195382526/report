import {syncAction} from '../../utils/request';

const DATAANALYSE = 'dataanalyse'

//获取回收进度信息
export const getRetrievalProgress = (data, token) => syncAction({
  method: 'RetrievalProgress.getRetrievalProgress',
  type: DATAANALYSE,
  data,
  token
});

//获取答题情况数据
export const getAnswerStatus = (data, token) => syncAction({
  method: 'PanelData.getAnswerStatus',
  type: DATAANALYSE,
  data,
  token
});

//获取单条答题数据
export const getAnswerResultById = (data, token) => syncAction({
  method: 'PanelData.getAnswerResultById',
  type: DATAANALYSE,
  data,
  token
});

//删除单条答题数据
export const deleteAnswerResultById = (data, token) => syncAction({
  method: 'PanelData.deleteAnswerResultById',
  type: DATAANALYSE,
  data,
  token
});

//获取答题分析数据
export const getChartStatistics = (data, token) => syncAction({
  method: 'Charting.getChartStatistics',
  type: DATAANALYSE,
  data,
  token
});

//获取配额进度
export const getQuotaProgress = (data, token) => syncAction({
  method: 'RetrievalProgress.getQuotaProgress',
  type: DATAANALYSE,
  data,
  token
});