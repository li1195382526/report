import Taro from '@tarojs/taro';
import { MAINHOST, noConsole, HTTP_STATUS } from '../config';
import { commonParame } from '../config/requestConfig'

const defaultUrl = '/v2/service/apis'

let token = Taro.getStorageSync('token')

/**
 * 内部调用用
 * @param {*} options 
 */
export function syncAction(options) {
  token = options.token || token
  let currentUrl = options.url ? options.url : defaultUrl
  console.log(currentUrl)
  console.log(options)
  return Taro.request({
    url: MAINHOST + currentUrl,
    data:  options.data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'ePanel ' + token
    },
    method: options.method,
    success: function (res) {
      const { data } = res;

      if (data.status == HTTP_STATUS.SUCCESS) {

        if (data.token) {
          Taro.setStorage({
            key: "token",
            data: data.token
          })
        }
      } else if (data.status == HTTP_STATUS.AUTHENTICATE) {
        Taro.removeStorageSync('token')
        Taro.redirectTo({
          url: '/pages/login/index',
        })
      }
    },
    fail: function () {

    }
  });
}
