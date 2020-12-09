import {syncAction} from '../../utils/request';

export const getTemplist = (data,token) => syncAction({
  data,
  method: "POST",
  token,
  url:'/v3/report/templates'
});
