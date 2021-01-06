/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea,AtMessage } from 'taro-ui'
// import { BeginToCollect } from '../../components/beginToCollect'
// import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'
import { QtSet } from '../../components/QtSet'
import { info as newinfo, questionnaire as newquestionnaire, registerInfo, registerQuestionnaire, voteInfo, voteQuestionnaire, attendanceInfo, attendanceQuestionnaire, noticeInfo, noticeQuestionnaire, investigationInfo, investigationQuestionnaire} from '../../config'

@connect(({ edit, home, common }) => ({
  ...edit,
  ...home,
  ...common
}))

class Edit extends Component {
  config = {
    navigationBarTitleText: '编辑填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      isFirstTemplate: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.getQuestionner = this.getQuestionner.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleTips = this.handleTips.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
    this.getTemplate = this.getTemplate.bind(this)
  }

  //获取问卷
  getQuestionner(){
    const {reportId} = this.$router.params
    Taro.setStorage({
      key: "reportId",
      data: reportId
    })
    this.props.dispatch({
      type: 'edit/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${reportId}`
    })
  }
  // 获取模板
  getTemplate() {
    const reportId = this.$router.params.reportId
    this.props.dispatch({
      type: 'edit/getTemplate',
      token: this.props.token,
      url:`/v3/report/template/${reportId}`
    })
  }
  componentWillMount(){
    const init = this.$router.params.isInit
    const isTemplate = this.$router.params.isTemplate
    const type = this.$router.params.type
    //第一次编辑填报前端数据，编辑中问卷获取问卷信息
    if(isTemplate == 1) {
      this.setState({isFirstTemplate: true}, () => {
        this.getTemplate()
      })
    }else if(init == 1 || init == 2){
      this.getQuestionner()
    }else{
      var info = {}
      var questionnaire = {}
      // 首页场景
      if (type == 'register') {
        info = JSON.parse(JSON.stringify(registerInfo))
        questionnaire = JSON.parse(JSON.stringify(registerQuestionnaire))
      } else if (type == 'vote') {
        info = JSON.parse(JSON.stringify(voteInfo))
        questionnaire = JSON.parse(JSON.stringify(voteQuestionnaire))
      } else if (type == 'attendance') {
        info = JSON.parse(JSON.stringify(attendanceInfo))
        questionnaire = JSON.parse(JSON.stringify(attendanceQuestionnaire))
      } else if (type == 'notice') {
        info = JSON.parse(JSON.stringify(noticeInfo))
        questionnaire = JSON.parse(JSON.stringify(noticeQuestionnaire))
      } else if (type == 'investigation') {
        info = JSON.parse(JSON.stringify(investigationInfo))
        questionnaire = JSON.parse(JSON.stringify(investigationQuestionnaire))
      } else {
        info = JSON.parse(JSON.stringify(newinfo))
        questionnaire = JSON.parse(JSON.stringify(newquestionnaire))
      }
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          info: info,
          questionnaire: questionnaire
        }
      })
    }
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          isModify:init == 2 ? false : true
        }
      })
  }
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleChange(){

  }

  //发布填报
  handleRelease(){
    var info = JSON.parse(JSON.stringify(this.props.info))
    var questionnaire = JSON.parse(JSON.stringify(this.props.questionnaire))

    // 如果是首次点击发布的模板问卷
    if(this.$router.params.isTemplate == 1 && this.state.isFirstTemplate) {
      var nInfo = JSON.parse(JSON.stringify(newinfo))
      var nQuestionnaire = JSON.parse(JSON.stringify(newquestionnaire))
      for(let i in nInfo) {
        if(info[i] && i != 'id') {
          nInfo[i] = info[i]
        }
      }
      nQuestionnaire.pageList = questionnaire.pageList
      info = nInfo
      questionnaire = nQuestionnaire
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          info,
          questionnaire
        }
      })
      this.setState({isFirstTemplate: false})
    }

    for(let pg of questionnaire.pageList) {
      if(!pg.qtList.length) {
        this.handleTips('error','填报题目不能为空')
        return
      }
      for(let qt of pg.qtList) {
        var messageText = ''
        if(qt.text.length === 0){
          messageText =  `${qt.disSeq}未填写题目标题`
          this.handleTips('error',messageText)
          return
        }
        for(let opt of qt.optlist) {
          if(opt.label === '' && qt.type != 2 ){
            messageText =  `${qt.disSeq}未填写选项内容`
            this.handleTips('error',messageText)
            return
          }
        }
      }
    }
    if(info.title.length === 0){
        this.handleTips('error','填报主题不能为空')
        return
    }
    if(info.title.length > 30){
      this.handleTips('error','填报主题不能超过30个字符')
      return
    }

    if(info.memo.length == 0){
      this.handleTips('error','填报说明不能为空')
      return
    }
    if(info.memo.length >= 200){
    this.handleTips('error','填报说明不能超过200个字符')
    return
    }
    if(info.useTimelimit == 1 && !info.beginTime || info.useTimelimit == 1 && !info.endTime) {
      this.handleTips('error','开启时间限制时开始与结束时间为必填')
      return
    }
    if(info.useCount == 1 && info.pnlCount.length === 0){
      this.handleTips('error','填报人数不能为空')
      return
    }else if(info.useCount == 1 && parseInt(info.pnlCount) <= 0){
      this.handleTips('error','填报人数必须大于零')
      return
    }else if(info.useCount == 1 && isNaN(parseInt(info.pnlCount))){
      this.handleTips('error','填报人数必须是正整数')
      return
    }
    
    if(info.useNamelist == 1 && info.namelist.length === 0){
      this.handleTips('error','填报名单不能为空')
      return
    }

    if(info.usePeriod == 1 && info.periodType.length === 0){
      this.handleTips('error','填报周期类别不能为空')
      return
    }

    if(info.usePeriod == 1 && info.periodSize.length === 0){
      this.handleTips('error','填报周期不能为空')
      return
    }
    // console.log(parseInt(info.periodSize))
    if(info.usePeriod == 1 && info.periodSize.length > 0 && parseInt(info.periodSize) < 0){
      this.handleTips('error','填报周期数必须为正整数')
      return
    }else if(info.usePeriod == 1 && isNaN(parseInt(info.periodSize))){
      this.handleTips('error','填报周期数必须是正整数')
      return
    }

    if(info.needPwd == 1 && info.pwd.length === 0){
      this.handleTips('error','开启密码时填报密码不能为空')
      return
    }

    if(info.needPwd == 1 && info.pwd.length > 4){
      this.handleTips('error','填报密码最多4位')
      return
    }

    if(info.needPwd == 1 &&  isNaN(parseInt(info.pwd))){
      this.handleTips('error','填报密码必须为4位正整数')
      return
    }
    
    if(info.creatorName === ''){
      info.creatorName = this.props.wxInfo.nickName
    }
    Taro.showLoading({title: '正在发布...', mask: true})
    const params = {
      info,
      questionnaire
    }
    this.props.dispatch({
      type: 'edit/saveQtn',
      token: this.props.token,
      payload: params,
    }).then(()=>{
      var {response} = this.props
      if(response.status == 200) {
        this.props.dispatch({
          type: 'edit/publish',
          token: this.props.token,
          payload: {reportId: response.data.id},
          url:`/v3/report/${response.data.id}/publish`
        }).then(()=>{
          const {qtnStatus,message} = this.props
          Taro.hideLoading()
          if(qtnStatus === 200){
            Taro.redirectTo({
              url: `/pages/release/index?listId=${response.data.id}`
             })
          }else{
            this.handleTips('error',message)
          }
          
        })
      } else {
        Taro.hideLoading()
        this.handleTips('error', response.message)
      }
    })  
  }

  handleTips (type,message) {
    Taro.atMessage({
      'message': message,
      'type': type,
    })
  }

  //保存
  handleSave(){
    var info = JSON.parse(JSON.stringify(this.props.info))
    var questionnaire = JSON.parse(JSON.stringify(this.props.questionnaire))

    // 如果是首次点击保存的模板问卷
    if(this.$router.params.isTemplate == 1 && this.state.isFirstTemplate) {
      var nInfo = JSON.parse(JSON.stringify(newinfo))
      var nQuestionnaire = JSON.parse(JSON.stringify(newquestionnaire))
      for(let i in nInfo) {
        if(info[i] && i != 'id') {
          nInfo[i] = info[i]
        }
      }
      nQuestionnaire.pageList = questionnaire.pageList
      info = nInfo
      questionnaire = nQuestionnaire
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          info,
          questionnaire
        }
      })
      this.setState({isFirstTemplate: false})
    }

    if(info.title.length === 0){
      this.handleTips('error','填报主题不能为空')
      return
    }
    if(info.title.length > 30){
      this.handleTips('error','填报主题不能超过30个字符')
      return
    }
    if (info.memo.length == 0) {
      this.handleTips('error', '填报说明不能为空')
      return
    }
    if (info.memo.length >= 200) {
      this.handleTips('error', '填报说明不能超过200个字符')
      return
    }
    if (info.useTimelimit == 1 && !info.beginTime || info.useTimelimit == 1 && !info.endTime) {
      this.handleTips('error', '开启时间限制时开始与结束时间为必填')
      return
    }
    if (info.useCount == 1 && info.pnlCount.length === 0) {
      this.handleTips('error', '填报人数不能为空')
      return
    } else if (info.useCount == 1 && parseInt(info.pnlCount) <= 0) {
      this.handleTips('error', '填报人数必须大于零')
      return
    } else if (info.useCount == 1 && isNaN(parseInt(info.pnlCount))) {
      this.handleTips('error', '填报人数必须是正整数')
      return
    }
    if (info.useNamelist == 1 && info.namelist.length === 0) {
      this.handleTips('error', '填报名单不能为空')
      return
    }
    if (info.usePeriod == 1 && info.periodType.length === 0) {
      this.handleTips('error', '填报周期类别不能为空')
      return
    }
    if (info.usePeriod == 1 && info.periodSize.length === 0) {
      this.handleTips('error', '填报周期不能为空')
      return
    }
    // console.log(parseInt(info.periodSize))
    if (info.usePeriod == 1 && info.periodSize.length > 0 && parseInt(info.periodSize) < 0) {
      this.handleTips('error', '填报周期数必须为正整数')
      return
    } else if (info.usePeriod == 1 && isNaN(parseInt(info.periodSize))) {
      this.handleTips('error', '填报周期数必须是正整数')
      return
    }
    if (info.needPwd == 1 && info.pwd.length === 0) {
      this.handleTips('error', '开启密码时填报密码不能为空')
      return
    }
    if (info.needPwd == 1 && info.pwd.length > 4) {
      this.handleTips('error', '填报密码最多4位')
      return
    }
    if (info.needPwd == 1 && isNaN(parseInt(info.pwd))) {
      this.handleTips('error', '填报密码必须为4位正整数')
      return
    }
    Taro.showLoading({title: '正在保存...', mask: true})
    if(info.creatorName.length === 0){
      info.creatorName = this.props.wxInfo.nickName
    }
    const params = {
      info,
      questionnaire
    }
    this.props.dispatch({
      type: 'edit/saveQtn',
      token: this.props.token,
      payload: params,
    }).then(()=>{
      const {status,message} = this.props
      Taro.hideLoading()
      if(status == 200){
        this.handleTips('success','保存成功')
      }else{
        this.handleTips('error',message)
      }
    })
  }

  handleTitle(value){
    let {info} = this.props
    info.title = value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info
      }
    })
  }

  handleMemo(value){
    // eslint-disable-next-line no-shadow
    let info = JSON.parse(JSON.stringify(this.props.info))
    info.memo = value.target.value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info
      }
    })
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {questionnaire,info,isModify} = this.props
    return (
      <View className='edit'>
        <AtMessage />
          <View>
             <View className='edit-title'>填报主题</View> 
             <View className='edit-titleText'>
             <AtInput
               name='value' 
               type='text'
               placeholder='请输入填报主题名称'
               value={info.title}
               onChange={this.handleTitle}
             />
             </View>
             <AtTextarea
               style={{borderTop:'none'}}
               value={info.memo}
               onChange={this.handleMemo.bind(this)}
               maxLength={200}
               placeholder='请输入填报说明描述'
             />
          </View>
       <View>
           <View className='edit-title'>填报题目</View>
           <Question questionnaire={questionnaire} />
       </View>
        <View>
          <View className='edit-title'>填报设置</View>
          <QtSet />
        </View>
        {isModify && (
           <View className='edit-footer'>
           <View className='edit-save' onClick={this.handleSave}>
             保存
           </View>
           <View className='edit-send' onClick={this.handleRelease}>
             发布填报
           </View>
         </View>
    )}
     {!isModify && (
      <View className='edit-footer'>
           <View className='edit-save1' onClick={this.handleSave}>
             保存
           </View>
         </View>
     )

     }
      </View>
    )
  }
}

export default Edit;
