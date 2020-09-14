import {syncAction} from '../../utils/request';

const QUESTIONNAIRE = 'questionnaire'
const INVITION = 'invition'
const PROJECT = 'project'

//查询问卷列表
export const getQuestionaires = (data, token) => syncAction({
  method: 'QuestionnaireCreater.queryQuestionnaire',
  type: QUESTIONNAIRE,
  data,
  token
});

//查询问卷类型
export const getQuestionaireType = (data, token) => syncAction({
  method: 'QuestionnaireService.queryQuestionnaireType',
  type: QUESTIONNAIRE,
  data,
  token
});

//更新问卷状态
export const updateQtnStatus = (data, token) => syncAction({
  method: 'InvitationManager.updateQtnStatus',
  type: INVITION,
  data,
  token
});

//获取问卷名称
export const getQuestionnaireName = (data, token) => syncAction({
  method: 'QuestionnaireService.getQuestionnaireName',
  type: QUESTIONNAIRE,
  data,
  token
});

//验证用户是否有项目权限
export const verifyUserExistProjects = (data, token) => syncAction({
  method: 'ProjectManager.verifyUserExistProjects',
  type: PROJECT,
  data,
  token
});

export const wxLogin = (data) => syncAction({
  url: '/thirdLogin/user/wxLogin',
  method: 'user.wxLogin',
  type: 'user',
  data
});