import * as Request from '../../utils/request';


  // eslint-disable-next-line import/prefer-default-export
  export const delList = ( data,token,url ) => Request.syncAction({
    url,
    method: 'DELETE',
    token,
    data
  });