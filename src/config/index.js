/** 
 * 项目配置文件
 */

/** 
 * 线上环境
 */
export const ONLINEHOST = 'https://www.epanel.cn'

/** 
 * 测试环境
 */
export const QAHOST = 'https://f.epanel.cn'

/** 
 * 线上mock
 */
export const MOCKHOST = 'http://xxx/mock'

/** 
 * 是否mock
 */
export const ISMOCK = false

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = QAHOST

/**
 * wx 根据 code 获取session地址
 */
export const WXGETSESSION = 'https://api.weixin.qq.com/sns/jscode2session'
export const APPID = 'wxc860d9612140ebd3'
export const SECRET = '3c0dc295779e688da881665f93239923'

// 输出日志信息
export const noConsole = false;

export const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

// promise status
export const SUCCESS = { success: 'success' }
export const FAIL = { fail: 'fail' }
export const COMPLETE = { complete: 'complete' }

export const PROMISE_STATUS = {
  success: 'success',
  fail: 'fail',
  complete: 'complete'
}

export const RESULT_STATUS = {
  SUCCESS: 0,
  SIGNATURE_FAILED: 1000  // 签名失败
}

// 问卷基本状态
export const statusOpts = [
  { value: 0, label: '编辑中' },
  { value: 2, label: '回收中' },
  { value: 5, label: '已结束' }
]

export const questionnaire = {
  "id": "1",
  "name": "填报1",
  "title": "填报1",
  "status": 0 ,
  "pageList": [{
    "qtList": [{
      "type": 1,
      "selectType": 1,
      "disSeq": "Q1",
      "fixSeq": "Q1",
      "mySeq": "Q1",
      "cols": 1,
      "img": "",
      "smax": 4,
      "smin": 1,
      "optlist": [{
        "fixSeq":"A1",
        "position":0,
        "val":1,
        "mySeq":"A1",
        "input":false,
        "fmt":"text",
        "seq":1,
        "img":"",
        "label":"选项1",
        "conf":{},
        "required":false,
        "optQuote":false
      },
      {
        "fixSeq":"A1",
        "position":0,
        "val":1,
        "mySeq":"A1",
        "input":false,
        "fmt":"text",
        "seq":1,
        "img":"",
        "label":"选项2",
        "conf":{},
        "required":false,
        "optQuote":false
      }
    ],
      "seq": "1",
      "text": "选择题",
  },
  {
    "type": 2,
    "selectType": 1,
    "disSeq": "Q1",
    "fixSeq": "Q1",
    "mySeq": "Q1",
    "cols": 1,
    "img": "",
    "smax": 4,
    "smin": 1,
    "optlist": [{
      "fixSeq":"A1",
      "position":0,
      "val":1,
      "mySeq":"A1",
      "input":false,
      "fmt":"text",
      "seq":1,
      "img":"",
      "label":"题目标题",
      "conf":{},
      "required":false,
      "optQuote":false
    }
  ],
    "seq": "1",
    "text": "填空",
}
],
  }],
}