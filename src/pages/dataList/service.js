import * as Request from '../../utils/request';

export const getNamelist = ( data,token,url) => Request.syncAction({
    url,
    method: 'POST',
    token,
    data
  });

  export const create= ( data,token,url) => Request.syncAction({
    url,
    method: 'POST',
    token,
    data
  });

  export const getName= ( token,url) => Request.syncAction({
    url,
    method: 'GET',
    token,
  });