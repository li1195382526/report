import Taro, { Component } from '@tarojs/taro';
import { View, Picker} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtButton,AtMessage } from 'taro-ui'
import './index.scss';
import {QtnCanvas} from '../../components/QtnCanvas'
import {fromJS} from 'immutable'
import { info } from '../../config';
import * as validates from "../../utils/validate";

@connect(({ answer, home, common }) => ({
  ...answer,
  ...home,
  ...common
}))

class Answer extends Component {
  config = {
    navigationBarTitleText: '开始填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      selector: ['小名', '小花', '小亮', '甜甜'],
      selectorChecked: '小名',
      passWord:'',
      isPassWord:false,
      isHavename:false,
      userAgent: '',
      checkNamelist: false,
      togglelist: [],
    }
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleNum = this.handleNum.bind(this)
    this.join = this.join.bind(this)
    this.getNamelist = this.getNamelist.bind(this)
    this.getAnswer = this.getAnswer.bind(this)
    this.wxMobilelogin = this.wxMobilelogin.bind(this)
    this.getQuestionner = this.getQuestionner.bind(this)
    this.modifySubmit = this.modifySubmit.bind(this)
  }

  componentWillMount() {
    if(!Taro.getStorageSync('mobile') && !Taro.getStorageSync('wxMobile')){
      Taro.redirectTo({url: `./wxphone?listId=${this.$router.params.listId}`})
    }
  };
  
  componentDidMount(){
    this.getQuestionner()

    const from = this.$router.params.from
    if( from === 'answerDetail' || from === 'home' || from === 'viewData'){
      this.getAnswer()
    }
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        noModify:from === 'viewData' ? true :false
      }
    })
    
  }

  //获取问卷
  getQuestionner(){
    const id = this.$router.params.listId
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({userAgent: JSON.stringify(res)})
      }
    })
    this.props.dispatch({
      type: 'answer/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${id}`
    }).then(() => {
      if(!this.$router.params.from) {
        this.join()
      }
    })
  }

  wxMobilelogin(){
    return
    let encryptedData = ''
    let iv = ''
    Taro.login()
      .then(r => {
        var code = r.code // 登录凭证
        if (code) {
          // 调用获取用户信息接口
          Taro.getUserInfo({
            success: function (res) {
              Taro.setStorage({
                key: "wxInfo",
                data: res.userInfo
              })
              encryptedData = res.encryptedData
              iv = res.iv
            }
          }).then(() => {
            let params = { encryptedData: encryptedData, iv: iv, code: code, oid: 'gh_13a2c24667b4',"userId": '0'}
            if (!!encryptedData && !!iv) {
              this.props.dispatch({
                type: 'answer/wxMobilelogin',
                payload: params
              }).then(()=>{
                this.getQuestionner()
              })
            } else {
              this.errorMessage('微信获取用户信息失败')
            }
          })
        } else {
          this.errorMessage('微信授权登录失败')
        }
      })
  }

  //获取指定填报结果数据
  getAnswer(){
    const mobile = Taro.getStorageSync('mobile')
    const wxMobile = Taro.getStorageSync('wxMobile')
    const reportId = this.$router.params.listId
    const period = this.$router.params.period
    this.props.dispatch({
      type: 'answer/getAnswer',
      token: this.props.token,
      url:`/v3/report/${reportId}/period/${period}/participant/${!!mobile ? mobile :wxMobile}/answer`
    })
  }

  // 获取名单
  getNamelist() {
    this.props.dispatch({
      type: 'answer/getNamelist',
      url:`/v3/report/${this.$router.params.listId}/namelist`
    }).then(() => {
      let list = []
      const {namelist} = this.props
      for (let i of namelist) {
        if(i.status == 0) {
          list.push(i)
        }
      }
      this.setState({togglelist: list})
    })
  }

  //切换人员名单
   onChange (e)  {
    const {togglelist} = this.state
    this.join(togglelist[e.detail.value])
  }

  submit(){
    const mobile = Taro.getStorageSync('mobile')
    const wxMobile = Taro.getStorageSync('wxMobile')
    const {res, anw,questionnaire, info} = this.props
    const id = this.$router.params.listId
    const periodCount = res.data.rep.period
    let params = {
      ctl: res.data.ctl,
      anw,
      rep: res.data.rep
    }

    //必答验证
    //questionnaire.pageList[0] 是因为现在没有分页
    const { pass, message } = validates.validate(fromJS(questionnaire.pageList[0].qtList), fromJS(anw));
    if (!pass) {
      Taro.atMessage({
        'message': message,
        'type': 'error',
        'duration': 1000
      })
      return;
    }

    this.props.dispatch({
      type: 'answer/subMitAnswer',
      token: this.props.token,
      url:`/v3/report/${id}/participant/${!!mobile ? mobile :wxMobile}/submit`,
      payload: params,
      reportId: this.$router.params.listId,
      period:periodCount,
      canEdit: info.canEdit
    })
    
  }

  //修改填报
  modifySubmit(){
    const mobile = Taro.getStorageSync('mobile')
    const wxMobile = Taro.getStorageSync('wxMobile')
    const {anw,questionnaire,res} = this.props
    //const periodCount = res.data.rep.period
    const periodCount = this.$router.params.period
    const id = this.$router.params.listId
    let params = {
      anw,
    }
    //必答验证
    //questionnaire.pageList[0] 是因为现在没有分页
    const { pass, message } = validates.validate(fromJS(questionnaire.pageList[0].qtList), fromJS(anw));
    if (!pass) {
      Taro.atMessage({
        'message': message,
        'type': 'error',
        'duration': 1000
      })
      return;
    }
    this.props.dispatch({
      type: 'answer/modifySubmit',
      token: this.props.token,
      url:`/v3/report/${id}/period/${periodCount}/participant/${!!mobile ? mobile :wxMobile}/answer`,
      payload: params,
      reportId: this.$router.params.listId,
      period:periodCount
    })
  }

  //确认填报密码
  handlePassword(){
    const {passWord} = this.state
    var { info, res } = this.props
    if(!passWord) {
      Taro.showToast({
        title: '密码必须输入且不能为空格',
        icon: 'none',
        duration: 1500
      })
      return
    } else {
      this.setState({isPassWord:false})
      this.join()
    }
  }
  // 密码填写oninput
  handleNum(val){
    // eslint-disable-next-line react/no-unused-state
    this.setState({passWord:val.target.value.replace(/\s+/g,'')})
  }
  // 密码框取消
  cancelPwd() {
    Taro.showToast({
      title: '密码必须输入',
      icon: 'none',
      duration: 1500
    })
    return
  }
  getPhoneNumber(e) {
    Taro.login().then(r => {
      var code = r.code
      console.log(r)
      if(code && e.detail.errMsg.split(':')[1] == 'ok') {
        console.log('手机号信息',e)
        let params = {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          code,
          userId: '0',
          oid: 'gh_13a2c24667b4'
        }
      } else {
        Taro.showToast({
          title: '获取用户信息失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        Taro.redirectTo({url: '../home/index'})
      }
    })
  }

  // 进入填报
  join(item) {
    const {passWord, userAgent} = this.state
    const id = this.$router.params.listId
    const listIndex = item ? item.listIndex : ''
    var mobile = Taro.getStorageSync('mobile')
    const wxMobile = Taro.getStorageSync('wxMobile')
    let params = {
      mobile:!!mobile ? mobile :wxMobile,
      pwd: passWord,
      listIndex,
      userAgent
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setState({isHavename: false})
    this.props.dispatch({
      type: 'answer/joinReport',
      token: this.props.token,
      url:`/v3/report/${id}/join`,
      payload: params
    }).then(() => {
      Taro.hideLoading()
      let {res} = this.props
      if((res.status == 203 && res.message == '密码错误') || res.status == -1001) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        this.setState({isPassWord: true})
      } else if(res.status == -1003) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        this.getNamelist()
        this.setState({isHavename: true, checkNamelist: true})
      } else if(res.status == -1002) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        Taro.redirectTo({url: `./wxphone?listId=${this.$router.params.listId}`})
      } else if(res.status == 203) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        setTimeout(() => {
          //Taro.redirectTo({url: '../home/index'})
        }, (2000));
      }
    })
  }

  render() {
    const {isPassWord,isHavename, passWord, checkNamelist, togglelist} = this.state
    const {questionnaire,info, namelist, res} = this.props
    const from = this.$router.params.from
    const indexed = namelist.findIndex(item => item.status == 29)
    const index = namelist.findIndex(item => item.status == 0)
    return (
      <View className='answer'>
        <AtMessage />
        {info.useNamelist == 1 && (
          <View className='change-name'>
            <View>{res.status == 200 ? res.data.rep.name : '未知'}</View>
            {checkNamelist && (
              <Picker mode='selector' range={togglelist} rangeKey='name' onChange={this.onChange}>
                <View>切换名单</View>
              </Picker>
            )}
          </View>
        )}
        <View className='answer-title'>
          <View className='title'>{info.title}</View>
          <View className='memo'>{info.memo}</View>
        </View>
        <View className='answer-list'>
          <QtnCanvas questionnaire={questionnaire} />
        </View>
        {from != 'viewData' && from != 'answerDetail' && from != 'home'&&  (
          <View className='answer-footer'>
            <AtButton type='primary' onClick={this.submit}>提交填报</AtButton> 
          </View>
        )}
        {(from == 'answerDetail' || from == 'home') &&  (
          <View className='answer-footer'>
            <AtButton type='primary' onClick={this.modifySubmit}>提交填报</AtButton> 
          </View>
        )}
        
        {isHavename && (
          <AtModal isOpened={isHavename} closeOnClickOverlay={false}>
            <AtModalHeader>选择填答名单</AtModalHeader>
            <AtModalContent>
              <View className='answer-namelist'>
                <View className='tip'>请对号入座，选择正确的名单进行填报</View>
                <View className='content-name'>
                  {namelist.map((item, key) => (
                    item.status == 0 && (
                      <View className='name' onClick={() => this.join(item)} key={key}>
                        <View className='name-key'>{key+1}</View>
                        <View className='name-text'>{item.name}</View>
                      </View>
                    )
                  ))}
                  {index == -1 && <View className='name-text'>暂无可选名单，请联系管理员</View>}
                </View>
                <View>
                  <View className='finish'>已填报</View>
                  <View className='finish-namelist'>
                    {namelist.map((i,key1) => (
                      i.status == 29 && (
                        <View className='finish-name' key={key1}>
                          <View className='finish-key'>{key1+1}</View>
                          <View className='name'>{i.name}</View>
                        </View>
                      )
                    ))}
                    {indexed == -1 && <View className='name'>暂无回答完成人员</View>}
                  </View>
                </View>
              </View>
            </AtModalContent>
          </AtModal>
        )}
        {isPassWord && (
          <AtModal isOpened={isPassWord} closeOnClickOverlay={false}>
            <AtModalHeader>密码验证</AtModalHeader>
            <AtModalContent className='pass-content'>
                <Input type='text' 
                  placeholder='请输入填报密码' 
                  value={passWord}
                  onInput={(val)=>this.handleNum(val)}
                />
            </AtModalContent>
            <AtModalAction> <Button onClick={this.cancelPwd}>取消</Button> <Button onClick={this.handlePassword}>确定</Button> </AtModalAction>
          </AtModal>
        )}

      </View>
    )
  }
}

export default Answer;
