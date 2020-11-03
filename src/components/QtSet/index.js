import Taro, { Component } from '@tarojs/taro'
import { View,Picker,Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import {AtList,AtListItem, AtFloatLayout, AtSwitch }  from 'taro-ui'
import { DateTimePicker } from '../../components/DateTimePicker'
import Model from '../Model/model'
import { connect } from '@tarojs/redux';
import './index.scss'


@connect(({ edit, home, common,nameList }) => ({
  ...edit,
  ...home,
  ...common,
  ...nameList
}))
class QtSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
        isShowBeginTime: false,
        isShowExpireTime: false,
        isLimit:false,
        selector: ['日', '周', '月', '年'],
        selectorChecked: '日',
        hint:''
      }
      this.handleSetName = this.handleSetName.bind(this)
      this.handleNum = this.handleNum.bind(this)
      this.handleBeginTimeSetting = this.handleBeginTimeSetting.bind(this)
      this.handleExpireTimeSetting = this.handleExpireTimeSetting.bind(this)
      this.handlePeopleLimit = this.handlePeopleLimit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.saveTime = this.saveTime.bind(this)
  }

  //填报设置
  handleChange(val,type){
    let {isChange} = this.props
    let info = JSON.parse(JSON.stringify(this.props.info))
    if(val.target.value && type === 'useCount'){
      info.useNamelist = 0
      info.namelist = []
    }
    if(val.target.value && type === 'useNamelist'){
      info.useCount = 0
      info.pnlCount = ''
    }
    if(!val.target.value && type === 'useTimelimit') {
      info.beginTime = ''
      info.endTime = ''
    } // 时间限制
    if(!val.target.value && type === 'useCount'){
      info.pnlCount = ''
    } // 填写人数
    if(!val.target.value && type === 'useNamelist'){
      info.namelist = []
      info.isUserlimit = ''
    } // 填报名单
    if(!val.target.value && type === 'usePeriod'){
      info.periodType = ''
      info.periodSize = ''
      info.isStrict = ''
    } // 填写周期
    if(!val.target.value && type === 'needPwd'){
      info.pwd = ''
    } // 填报密码
    info[type] = val.target.value ? 1 : 0
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info,
        isChange:!isChange
      }
    })
  }

  //设置名单
  handleSetName(){
    const {isModify} = this.props
    if(isModify){
      Taro.navigateTo({
      url: '/pages/nameList/index?from=edit'
     })
    }
  }

   // 开始时间设置开关
   handleBeginTimeSetting(value) {
    this.setState({
      isShowBeginTime: value
    })
  }

    // 截止时间设置开关
    handleExpireTimeSetting(value){
      this.setState({
        isShowExpireTime: value
      })
    }

    //设置时间
    saveTime(val,type){
      let {info,isChange} = this.props
      const time = val ? val.current + ':00' : ''
      if(time && type == 'beginTime') {
        let start = time.match(/\d/g).join('') * 1
        let now = (val.now + ':00').match(/\d/g).join('') * 1
        if(now > start) {
          Taro.showToast({
            title: '开始时间不能早于当前时间',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
      if(time && info.beginTime && type == 'endTime') {
        let end = time.match(/\d/g).join('') * 1
        let start = info.beginTime.match(/\d/g).join('') * 1
        if(start > end) {
          Taro.showToast({
            title: '结束时间不应早于开始时间',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
      if(time && info.endTime && type == 'beginTime') {
        let start = time.match(/\d/g).join('') * 1
        let end = info.endTime.match(/\d/g).join('') * 1
        if(start > end) {
          Taro.showToast({
            title: '开始时间不应晚于结束时间',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
      info[type] = !!val  ? time :''
      this.props.dispatch({
        type: 'edit/save',
        payload: {
          info,
          isChange:!isChange
        }
      })
        this.setState({
          isShowExpireTime:false,
          isShowBeginTime:false
        })
    }

  //填写人数,周期数
  handleNum(value,type){
    //pnl_count
    let {info,isChange} = this.props
    info[type] = value.target.value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info,
        isChange:!isChange
      }
    })
  }
 

  //开启限制人员
  handlePeopleLimit(value,val,type){
    let {info,isChange} = this.props
    info[type] = value ? 1 : 0
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info,
        isChange:!isChange
      }
    })
    if(value){
      this.setState({
        isLimit: true,
        hint: val === 1 ? "1、开启连续填报：连续周期内，每个周期仅填写一次，不可提前或延后填写其他周期 2、关闭连续填报：不限制填写时间，可随时填写所有周期内的数据。" : "开启填报限制后，仅允许每个名单关联的账号填报，其他微信账号不允许填报"
      })
    }
  }

  //关闭限制人员提示弹框
  handleClose(){
    this.setState({
      isLimit:false
    })
  }

  //周期类型
  onChange (e)  {
    let {info,isChange} = this.props
    info.periodType = e.detail.value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info,
        isChange:!isChange
      }
    })
  }
  
  render() {
    const {isLimit,hint} = this.state
    const {info,isModify} = this.props
    let beginTimeList = !!info.beginTime ? info.beginTime :'未设置'
    let expireTimeList = !!info.endTime ? info.endTime  :'未设置'
    const nameSet =  info.namelist && info.namelist.length > 0 ? info.namelist.length + '人' :'未设置'
    return (
        <View className='qtn-setting'>
          <AtList>
          <AtListItem
            title='时间限制'
            isSwitch
            disabled={!isModify}
            switchIsCheck={info.useTimelimit == 1 ? true :false} 
            onSwitchChange={(val)=>this.handleChange(val,'useTimelimit')} 
          />
          {info.useTimelimit == 1 && (
            <View className='time'>
              <AtListItem title='开始时间'
                disabled={!isModify}
                arrow='right'
                extraText={beginTimeList}
                onClick={() => this.handleBeginTimeSetting(true)}
              />
              <AtListItem title='结束时间'
                disabled={!isModify}
                arrow='right'
                extraText={expireTimeList}
                onClick={() => this.handleExpireTimeSetting(true)}
              />
            </View>
          )}
          </AtList>
          {this.state.isShowBeginTime && (
            <AtFloatLayout isOpened={this.state.isShowBeginTime} title='开始时间设置'
              onClose={()=>this.handleBeginTimeSetting( false)}
            >
              <DateTimePicker initValue={info.beginTime}
                onOk={(val)=>this.saveTime(val,"beginTime")}
                onClear={(val)=>this.saveTime(val,"beginTime")} 
              />
            </AtFloatLayout>
          )}
          {this.state.isShowExpireTime && (
            <AtFloatLayout isOpened={this.state.isShowExpireTime} title='结束时间设置' onClose={()=>this.handleExpireTimeSetting(false)}>
              <DateTimePicker initValue={info.endTime}
                onOk={(val)=>this.saveTime(val,"endTime")}
                onClear={(val)=>this.saveTime(val,"endTime")}
              />
            </AtFloatLayout> 
          )}
           
          <AtList>
          <AtListItem
            title='填写人数'
            disabled={!isModify}
            isSwitch
            switchIsCheck={info.useCount == 1 ? true :false}  
            onSwitchChange={(val)=>this.handleChange(val,'useCount')} 
          />
                {info.useCount == 1 && (
                  <AtList>
                  <View className='set-cycle'>
                    <View>设置人数</View>
                    <Input type='number' 
                      disabled={!isModify}
                      placeholder='请输入填报人数' 
                      onChange={(val)=>this.handleNum(val,'pnlCount')}
                      value={info.pnlCount} 
                    />
                  </View>
                  </AtList>
                )}
                <AtListItem
                  title='填报名单'
                  isSwitch
                  disabled={!isModify}
                  switchIsCheck={info.useNamelist == 1 ? true :false}
                  onSwitchChange={(val)=>this.handleChange(val,'useNamelist')}
                />
                
              {info.useNamelist == 1 && (<AtListItem title='名单设置'  extraText={nameSet} onClick={this.handleSetName} arrow='right'/>)}
              {info.useNamelist == 1 && (
                <AtSwitch 
                  title='填报人员限制'
                  disabled={!isModify} 
                  checked={info.isUserlimit == 1 ? true :false} 
                  onChange={(val)=>this.handlePeopleLimit(val,0,"isUserlimit")} 
                />
              )} 
               <AtListItem
                 title='填写周期'
                 disabled={!isModify}
                 isSwitch
                 switchIsCheck={info.usePeriod == 1 ? true :false}
                 onSwitchChange={(val)=>this.handleChange(val,'usePeriod')} 
               />
                {info.usePeriod == 1 && (
                  <View>
                  <Picker mode='selector' range={this.state.selector} onChange={this.onChange} disabled={!isModify}>
                    <AtList>
                      <AtListItem
                        title='周期类型'
                        extraText={
                          info.periodType.length === 0 ? "未设置" : this.state.selector[info.periodType]
                        }
                      />
                    </AtList>
                  </Picker>
                  <AtList>
                      <View className='set-cycle'>
                        <View>连续周期数</View>
                        <Input 
                          type='number'
                          disabled={!isModify} 
                          placeholder='请输入周期数'
                          value={info.periodSize}
                          onChange={(val)=>this.handleNum(val,'periodSize')}
                        />
                      </View>
                  </AtList>
                  <AtSwitch 
                    title='连续填报'
                    disabled={!isModify} 
                    checked={info.isStrict == 1 ? true :false} 
                    onChange={(val)=>this.handlePeopleLimit(val,1,'isStrict')}
                  />
                  </View>
                )}
                <AtListItem
                  title='允许填报人修改'
                  disabled={!isModify}
                  isSwitch
                  switchIsCheck={info.canEdit == 1 ? true :false} 
                  onSwitchChange={(val)=>this.handleChange(val,'canEdit')} 
                />
                <AtListItem
                  title='填报密码'
                  disabled={!isModify}
                  isSwitch
                  switchIsCheck={info.needPwd == 1 ? true :false}  
                  onSwitchChange={(val)=>this.handleChange(val,'needPwd')} 
                />
                {info.needPwd == 1 && (
                  <AtList>
                    <View className='set-cycle'>
                      <View>设置密码</View>
                      <Input 
                        disabled={!isModify}
                        type='number' 
                        placeholder='请输入填报密码'
                        value={info.pwd}
                        maxLength={4}
                        onChange={(val)=>this.handleNum(val,'pwd')} 
                      />
                    </View>
                </AtList>
                )}
                
          </AtList>
          <View className='set-publisher'>
            <View>发布人昵称</View>
            <Input 
              disabled={!isModify}
              type='text' 
              placeholder='示例:李老师'
              value={info.creatorName}
              onChange={(val)=>this.handleNum(val,'creatorName')} 
            />
          </View>
          <Model isLimit={isLimit} handleClose={this.handleClose} hint={hint}/>
        </View>
    )
  }
}

export default QtSet
