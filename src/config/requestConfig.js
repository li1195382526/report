const timestamp = '2017-06-30 07:49:40'
const transSeq = 'IG2gmPscw0DoKlPQ'
const version = 'V2.0'

/** 
 * 请求的公共参数
 */
export const commonParame = {
  "timestamp": timestamp,
  "transSeq": transSeq,
  "version": version
}

/**
 * 请求映射文件
 */
export const requestConfig = {
  loginUrl: '/api/user/wechat-auth', // 微信登录接口
}