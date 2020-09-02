import {syncAction} from '../../utils/request';

const PROJECT = 'project'
const QUESTIONNAIRE = 'questionnaire'

//查询我的项目
export const queryProject = (data, token) => syncAction({
  method: 'ProjectManager.queryProject',
  type: PROJECT,
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

//查询项目问卷
export const queryQuestionnaire = (data, token) => syncAction({
  method: 'ProjectQuestionnaireManager.queryQuestionnaire',
  type: PROJECT,
  data,
  token
});