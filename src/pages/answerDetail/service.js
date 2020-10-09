import * as Request from '../../utils/request';

export const getDetail = (data, url) => Request.syncAction({
  url,
  method: 'GET',
  data
});
