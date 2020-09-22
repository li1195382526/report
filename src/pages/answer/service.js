import {syncAction} from '../../utils/request';

// eslint-disable-next-line import/prefer-default-export
export const getQuestionner = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});
