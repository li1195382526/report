import {syncAction} from '../../utils/request';

const QUESTIONNAIRE = 'questionnaire'
const INVITION = 'invition'
const PROJECT = 'project'

export const getQuestionner = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

//保存问卷
export const save = (data,token) => syncAction({
  url: '/v3/report/save',
  method: 'POST',
  token,
  type: 'user',
  data
});