import {syncAction} from '../../utils/request';

// eslint-disable-next-line import/prefer-default-export
export const getQuestionner = ( token,url) => syncAction({
  method: "GET",
  token,
  url,
});

export const subMitAnswer = ( data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url,
});

export const joinReport = ( data,token,url) => syncAction({
  data,
  method: "POST",
  token,
  url,
});

export const getNamelist = ( url) => syncAction({
  method: "Get",
  url,
});
