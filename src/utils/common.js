import moment from 'moment';

export const repeat = (times, str = '0') => (new Array(times + 1)).join(str);
// 时间前面 +0 
export const pad = (num, maxLength = 2) => repeat('0', maxLength - num.toString().length) + num;
/** 时间格式的转换 */
export const formatTime = time => {
  `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

export const formatOnlyDate = date => {
  return moment(date).format('YYYY-MM-DD')
}

export var globalData = {} // 全局公共变量


export function strip(html) {
  return html === undefined
    ? ''
    : html.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, '')
}


// 截取字符串

export const sliceStr = (str, sliceLen) => {
  if (!str) { return '' }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}


/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj) {
  var buf
  if (jsonObj instanceof Array) {
    buf = []
    var i = jsonObj.length
    while (i--) {
      buf[i] = objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (var k in jsonObj) {
      buf[k] = objClone(jsonObj[k])
    }
    return buf
  } else {
    return jsonObj
  }
}