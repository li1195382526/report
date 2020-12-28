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
export const MAINHOST = ONLINEHOST

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
  "id": "0",
  "name": "",
  "title": "",
  "status": 0 ,
  "pageList": [{
    "qtList": [
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
      "label":"",
      "conf":{},
      "required":true,
      "optQuote":false
    }
  ],
    "seq": "1",
    "text": "",
    "required":true,
}
],
  }],
}

export const  info = {
  "id": "0",
  "title": "",
  "memo": "",
  "useTimelimit": "",
  "beginTime": "" ,
  "endTime": "",
  "useCount": "",
  "pnlCount": "",
  "useNamelist": "",
  "namelist": [],
  "usePeriod": "",
  "periodType": "",
  "periodSize": "",
  "isStrict": "",
  "isUserLimit": "",
  "canEdit": "",
  "needPwd": "",
  "pwd": "",
  "creatorName": ""
 }
export const registerInfo = {
  "canEdit": 0,
  "creatorName": "",
  "finishCount": 0,
  "id": 0,
  "isStrict": 0,
  "isUserlimit": 0,
  "memo": "您好！非常感谢您愿意用几分钟的时间，填以下登记信息",
  "namelist": [],
  "needPwd": 0,
  "periodSize": 1,
  "periodType": 0,
  "pnlCount": 0,
  "pwd": "",
  "title": "报名登记",
  "totalCount": 0,
  "useCount": 0,
  "useNamelist": 0,
  "usePeriod": 0,
  "useTimelimit": 0
}
export const registerQuestionnaire = {
  "closeType": 0,
  "conf": "{}",
  "deptId": 0,
  "id": 0,
  "isTemplateQtn": 0,
  "name": "报名登记",
  "nextId": 0,
  "over": "您已成功完成问卷，感谢您的回答！",
  "pageList": [
    {
      "conf": "",
      "qtList": [
        {
          "conf": {},
          "disSeq": "Q1",
          "disStatus": 0,
          "fixSeq": "Q1",
          "img": "",
          "isQuote": false,
          "mySeq": "Q1",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "姓名",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q2",
          "disStatus": 0,
          "fixSeq": "Q2",
          "img": "",
          "isQuote": false,
          "mySeq": "Q2",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "男",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "女",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 0,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "性别",
          "type": 1,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q3",
          "disStatus": 0,
          "fixSeq": "Q3",
          "img": "",
          "isQuote": false,
          "mySeq": "Q3",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "出生日期",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q4",
          "disStatus": 0,
          "fixSeq": "Q4",
          "img": "",
          "isQuote": false,
          "mySeq": "Q4",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "出生地",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q5",
          "disStatus": 0,
          "fixSeq": "Q5",
          "img": "",
          "isQuote": false,
          "mySeq": "Q5",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "籍贯（严格按照户口所在地）",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q6",
          "disStatus": 0,
          "fixSeq": "Q6",
          "img": "",
          "isQuote": false,
          "mySeq": "Q6",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "民族",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q7",
          "disStatus": 0,
          "fixSeq": "Q7",
          "img": "",
          "isQuote": false,
          "mySeq": "Q7",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "身份证号",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q8",
          "disStatus": 0,
          "fixSeq": "Q8",
          "img": "",
          "isQuote": false,
          "mySeq": "Q8",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "家庭住址",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q9",
          "disStatus": 0,
          "fixSeq": "Q9",
          "img": "",
          "isQuote": false,
          "mySeq": "Q9",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 7,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "联系电话",
          "type": 2,
          "useStatus": 0
        }
      ],
      "seq": 1,
      "title": "第1页",
    }
  ],
  "prjId": 0,
  "screenOver": "非常抱歉，您不适合本次调查的人群条件，感谢您的参与",
  "status": 0,
  "templateQtnId": 0,
  "title": "报名登记",
  "types": 90,
  "version": 1,
  "whatQtn": 0
}
export const voteInfo = {
  "beginTime": "",
  "canEdit": 0,
  "creatorName": "",
  "endTime": "",
  "finishCount": 0,
  "id": 0,
  "isStrict": 0,
  "isUserlimit": 0,
  "memo": "请大家针对此项活动方案进行投票，谢谢参与！",
  "namelist": [],
  "needPwd": 0,
  "periodSize": 1,
  "periodType": 0,
  "pnlCount": 0,
  "pwd": "",
  "title": "活动投票",
  "totalCount": 0,
  "useCount": 0,
  "useNamelist": 1,
  "usePeriod": 0,
  "useTimelimit": 1
}
export const voteQuestionnaire = {
  "closeType": 0,
  "conf": "{}",
  "deptId": 0,
  "id": 0,
  "isTemplateQtn": 0,
  "name": "活动投票",
  "nextId": 0,
  "over": "您已成功完成问卷，感谢您的回答！",
  "pageList": [
    {
      "conf": "",
      "qtList": [
        {
          "conf": {},
          "disSeq": "Q1",
          "disStatus": 0,
          "fixSeq": "Q1",
          "img": "",
          "isQuote": false,
          "mySeq": "Q1",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "方案1",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "方案2",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A3",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "方案3",
              "mySeq": "A3",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A4",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "方案4",
              "mySeq": "A4",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 0,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "请选择方案里你最感兴趣的1个吧～",
          "type": 1,
          "useStatus": 0
        }
      ],
      "seq": 1,
      "title": "第1页",
    }
  ],
  "prjId": 0,
  "screenOver": "非常抱歉，您不适合本次调查的人群条件，感谢您的参与",
  "status": 0,
  "templateQtnId": 0,
  "title": "活动投票",
  "types": 90,
  "version": 1,
  "whatQtn": 0
}
export const attendanceInfo = {
  "canEdit": 0,
  "creatorName": "",
  "finishCount": 0,
  "id": 0,
  "isStrict": 1,
  "isUserlimit": 0,
  "memo": "请大家每天按时打卡， 让我们齐心协力抗击疫情！",
  "namelist": [],
  "needPwd": 0,
  "periodSize": 21,
  "periodType": 0,
  "pnlCount": 0,
  "pwd": "",
  "status": 0,
  "title": "每日健康打卡",
  "totalCount": 0,
  "useCount": 0,
  "useNamelist": 0,
  "usePeriod": 1,
  "useTimelimit": 0
}
export const attendanceQuestionnaire = {
  "closeType": 0,
  "conf": "{}",
  "deptId": 0,
  "id": 0,
  "isTemplateQtn": 0,
  "name": "每日健康打卡",
  "nextId": 0,
  "over": "您已成功完成问卷，感谢您的回答！",
  "pageList": [
    {
      "conf": "",
      "qtList": [
        {
          "conf": {},
          "disSeq": "Q1",
          "disStatus": 0,
          "fixSeq": "Q1",
          "img": "",
          "isQuote": false,
          "mySeq": "Q1",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "北京",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "北京之外非疫情区",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A3",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "国外（境外）",
              "mySeq": "A3",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A4",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "国内疫情区",
              "mySeq": "A4",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 0,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "目前所在地",
          "type": 1,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q2",
          "disStatus": 0,
          "fixSeq": "Q2",
          "img": "",
          "isQuote": false,
          "mySeq": "Q2",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "今日测量体温",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q3",
          "disStatus": 0,
          "fixSeq": "Q3",
          "img": "",
          "isQuote": false,
          "mySeq": "Q3",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "无异常",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "发烧发热（体温大于37.2）",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A3",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "乏力",
              "mySeq": "A3",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A4",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "干咳",
              "mySeq": "A4",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A5",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "鼻塞",
              "mySeq": "A5",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A6",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "腹泻",
              "mySeq": "A6",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A7",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "其它",
              "mySeq": "A7",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "目前身体状况",
          "type": 1,
          "useStatus": 0
        }
      ],
      "seq": 1,
      "title": "第1页",
    }
  ],
  "prjId": 0,
  "screenOver": "非常抱歉，您不适合本次调查的人群条件，感谢您的参与",
  "status": 0,
  "templateQtnId": 0,
  "title": "每日健康打卡",
  "types": 90,
  "version": 1,
  "whatQtn": 0
}
export const noticeInfo = {
  "beginTime": "",
  "canEdit": 0,
  "creatorName": "",
  "endTime": "",
  "finishCount": 0,
  "id": 0,
  "isStrict": 0,
  "isUserlimit": 0,
  "memo": "大家收到此通知后，请回复收到！",
  "namelist": [],
  "needPwd": 0,
  "periodSize": 1,
  "periodType": 0,
  "pnlCount": 0,
  "pwd": "",
  "status": 0,
  "title": "消息通知",
  "totalCount": 0,
  "useCount": 0,
  "useNamelist": 1,
  "usePeriod": 0,
  "useTimelimit": 1
}
export const noticeQuestionnaire = {
  "closeType": 0,
  "conf": "{}",
  "deptId": 0,
  "id": 0,
  "isTemplateQtn": 0,
  "name": "消息通知",
  "nextId": 0,
  "over": "您已成功完成问卷，感谢您的回答！",
  "pageList": [
    {
      "conf": "",
      "qtList": [
        {
          "conf": {},
          "disSeq": "Q1",
          "disStatus": 0,
          "fixSeq": "Q1",
          "img": "",
          "isQuote": false,
          "mySeq": "Q1",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "收到",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "不知悉",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 0,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "收到通知，请回复",
          "type": 1,
          "useStatus": 0
        }
      ],
      "seq": 1,
      "title": "第1页",
    }
  ],
  "prjId": 0,
  "screenOver": "非常抱歉，您不适合本次调查的人群条件，感谢您的参与",
  "status": 0,
  "templateQtnId": 0,
  "title": "消息通知",
  "types": 90,
  "version": 1,
  "whatQtn": 0
}
export const investigationInfo = {
  "beginTime": "",
  "canEdit": 0,
  "creatorName": "",
  "endTime": "",
  "finishCount": 0,
  "id": 0,
  "isStrict": 0,
  "isUserlimit": 0,
  "memo": "感谢您对准报的支持，为了今后我们为您提供更好的产品服务，希望您能抽出几分钟时间对我们的产品提出使用反馈，我们将及时整理反馈意见，完善我们的产品服务。",
  "namelist": [],
  "needPwd": 0,
  "periodSize": 1,
  "periodType": 0,
  "pnlCount": 0,
  "pwd": "",
  "status": 0,
  "title": "产品使用体验反馈",
  "totalCount": 0,
  "useCount": 0,
  "useNamelist": 0,
  "usePeriod": 0,
  "useTimelimit": 1
}
export const investigationQuestionnaire = {
  "closeType": 0,
  "conf": "{}",
  "deptId": 0,
  "id": 0,
  "isTemplateQtn": 0,
  "name": "产品使用体验反馈",
  "nextId": 0,
  "over": "您已成功完成问卷，感谢您的回答！",
  "pageList": [
    {
      "conf": "",
      "qtList": [
        {
          "conf": {},
          "disSeq": "Q1",
          "disStatus": 0,
          "fixSeq": "Q1",
          "img": "",
          "isQuote": false,
          "mySeq": "Q1",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "功能问题",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A2",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "问题咨询",
              "mySeq": "A2",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A3",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "意见建议",
              "mySeq": "A3",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            },
            {
              "conf": {},
              "fixSeq": "A4",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "优化改进",
              "mySeq": "A4",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 0,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "您此次要反馈的信息类型是",
          "type": 1,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q2",
          "disStatus": 0,
          "fixSeq": "Q2",
          "img": "",
          "isQuote": false,
          "mySeq": "Q2",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 1,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "请在此写下您的具体反馈内容",
          "type": 2,
          "useStatus": 0
        },
        {
          "conf": {},
          "disSeq": "Q3",
          "disStatus": 0,
          "fixSeq": "Q3",
          "img": "",
          "isQuote": false,
          "mySeq": "Q3",
          "optlist": [
            {
              "conf": {},
              "fixSeq": "A1",
              "fmt": "text",
              "img": "",
              "input": false,
              "label": "",
              "mySeq": "A1",
              "optQuote": false,
              "position": 0,
              "required": true,
              "seq": 1,
              "val": 1,
              "value": 0
            }
          ],
          "parentId": 0,
          "pattenId": "0",
          "rank": false,
          "required": true,
          "selectType": 7,
          "seq": 1,
          "smax": 4,
          "smin": 1,
          "sort": false,
          "sublist": [],
          "text": "请留下您的联系手机号",
          "type": 2,
          "useStatus": 0
        }
      ],
      "seq": 1,
      "title": "第1页",
    }
  ],
  "prjId": 0,
  "screenOver": "非常抱歉，您不适合本次调查的人群条件，感谢您的参与",
  "status": 0,
  "templateQtnId": 0,
  "title": "产品使用体验反馈",
  "types": 90,
  "version": 1,
  "whatQtn": 0
}

 export const choiceOpt = [{
  "fixSeq":"A1",
  "position":0,
  "val":1,
  "mySeq":"A1",
  "input":false,
  "fmt":"text",
  "seq":1,
  "img":"",
  "label":"",
  "conf":{},
  "required":true,
  "optQuote":false
},
{
  "fixSeq":"A2",
  "position":0,
  "val":1,
  "mySeq":"A2",
  "input":false,
  "fmt":"text",
  "seq":1,
  "img":"",
  "label":"",
  "conf":{},
  "required":true,
  "optQuote":false
}
]

export const openOpt = [{
  "fixSeq":"A1",
  "position":0,
  "val":1,
  "mySeq":"A1",
  "input":false,
  "fmt":"text",
  "seq":1,
  "img":"",
  "label":"",
  "conf":{},
  "required":true,
  "optQuote":false
}
]