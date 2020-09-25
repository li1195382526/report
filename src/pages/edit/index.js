/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea,AtMessage } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'
import { QtSet } from '../../components/QtSet'
import {info,questionnaire} from '../../config'

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
      
    }
    this.handleSave = this.handleSave.bind(this)
    this.getQuestionner = this.getQuestionner.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleTips = this.handleTips.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
  }

  //获取问卷
  getQuestionner(){
    const {reportId} = this.$router.params
    this.props.dispatch({
      type: 'edit/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${reportId}`
    })
  }

  componentWillMount(){
    const init = this.$router.params.isInit

    //第一次编辑填报前端数据，编辑中问卷获取问卷信息
    if(init == 1){
      this.getQuestionner()
    }else{
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          info,
          questionnaire
        }
      })
    }
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
    // eslint-disable-next-line no-shadow
    const {info,questionnaire} = this.props
    const {reportId} = this.$router.params
    if(info.title.length === 0){
        this.handleTips('error','填报主题不能为空')
        return
    }
    if(info.title.length >= 20){
      this.handleTips('error','填报主题不能超过20个字符')
      return
    }

    if(info.memo.length >= 200){
    this.handleTips('error','填报说明不能超过200个字符')
    return
    }

    if(info.useCount == 1 && info.pnlCount.length === 0){
      this.handleTips('error','填报人数不能为空')
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
      this.handleTips('error','填报周期长度不能为空')
      return
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
      this.props.dispatch({
        type: 'edit/publish',
        token: this.props.token,
        payload: {reportId},
        url:`/v3/report/${reportId}/publish`
      }).then(()=>{
        const {qtnStatus,message} = this.props
        if(qtnStatus === 200){
          Taro.navigateTo({
            url: '/pages/release/index'
           })
        }else{
          this.handleTips('error',message)
        }
        
      })
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
    // eslint-disable-next-line no-shadow
    const {info,questionnaire} = this.props
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
    let {info} = this.props
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
    const {questionnaire,info} = this.props
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
      <View className='edit-footer'>
        <View className='edit-save' onClick={this.handleSave}>
          保存
        </View>
        <View className='edit-send' onClick={this.handleRelease}>
          发布填报
        </View>
      </View>
      </View>
    )
  }
}

export default Edit;
