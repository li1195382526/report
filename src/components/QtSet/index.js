import Taro, { Component } from '@tarojs/taro'
import { View,Picker,Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import {AtList,AtListItem, AtFloatLayout, AtSwitch }  from 'taro-ui'
import './index.scss'
import { DateTimePicker } from '../../components/DateTimePicker'
import Model from '../Model/model'
import { connect } from '@tarojs/redux';


@connect(({ edit, home, common }) => ({
  ...edit,
  ...home,
  ...common
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

  handleChange(val,type){
    let {info,isChange} = this.props
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
    Taro.navigateTo({
      url: '/pages/nameList/index'
     })
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

    saveTime(val,type){
      let {info,isChange} = this.props
      const time = val.current + ':00'
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

    this.setState({
      isLimit:true,
      hint:val === 1 ? "1、开启连续填报：连续周期内，每个周期仅填写一次，不可提前或延后填写其他周期 ":"开启填报限制后，仅允许每个名单关联的账号填报，其他微信账号不允许填报"
    })
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
    const {info} = this.props
    let beginTimeList = !!info.beginTime ? info.beginTime :'未设置'
    let expireTimeList = !!info.endTime ? info.endTime  :'未设置'
    return (
        <View className='qtn-setting'>
          <AtList>
          <AtListItem
            title='时间限制'
            isSwitch
            switchIsCheck={info.useTimelimit == 1 ? true :false} 
            onSwitchChange={(val)=>this.handleChange(val,'useTimelimit')} 
          />
              {info.useTimelimit == 1 && (
                <View>
                <AtListItem title='开始时间'
                  arrow='right'
                  extraText={beginTimeList}
                  onClick={()=>this.handleBeginTimeSetting(true)}
                />
                  <AtListItem title='结束时间'
                    arrow='right'
                    extraText={expireTimeList}
                    onClick={()=>this.handleExpireTimeSetting(true)}
                  />
              </View>
              )}
          </AtList>
          
            <AtFloatLayout isOpened={this.state.isShowBeginTime} title='开始时间设置'
              onClose={()=>this.handleBeginTimeSetting( false)}>
            <DateTimePicker initValue={info.beginTime}
              onOk={(val)=>this.saveTime(val,"beginTime")}
              onClear={(val)=>this.saveTime(val,"beginTime")} 
            />
          </AtFloatLayout>
            <AtFloatLayout isOpened={this.state.isShowExpireTime} title='结束时间设置'
              onClose={()=>this.handleExpireTimeSetting(false)}>
            <DateTimePicker initValue={info.endTime}
              onOk={(val)=>this.saveTime(val,"endTime")}
              onClear={(val)=>this.saveTime(val,"endTime")}
            />
          </AtFloatLayout> 
           
          <AtList>
          <AtListItem
            title='填写人数'
            isSwitch
            switchIsCheck={info.useCount == 1 ? true :false}  
            onSwitchChange={(val)=>this.handleChange(val,'useCount')} 
          />
                {info.useCount == 1 && (
                  <AtList>
                  <View className='set-cycle'>
                    <View>设置人数<Text>（不填为不限）</Text></View>
                    <Input type='text' 
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
                  switchIsCheck={info.useNamelist == 1 ? true :false}
                  onSwitchChange={(val)=>this.handleChange(val,'useNamelist')}
                />
                
              {info.useNamelist == 1 && (<AtListItem title='名单设置'  extraText='未设置' onClick={this.handleSetName} arrow='right'/>)}
              {info.useNamelist == 1 && (
                <AtSwitch 
                  title='填报人员限制' 
                  checked={info.isUserlimit == 1 ? true :false} 
                  onChange={(val)=>this.handlePeopleLimit(val,0,"isUserlimit")} 
                />
              )} 
               <AtListItem
                  title='填写周期'
                  isSwitch
                  switchIsCheck={info.usePeriod == 1 ? true :false}
                  onSwitchChange={(val)=>this.handleChange(val,'usePeriod')} 
               />
                {info.usePeriod == 1 && (
                  <View>
                  <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                    <AtList>
                      <AtListItem
                        title='周期类型'
                        extraText={this.state.selector[info.periodType]}
                      />
                    </AtList>
                  </Picker>
                  <AtList>
                      <View className='set-cycle'>
                        <View>连续周期数</View>
                        <Input 
                          type='text' 
                          placeholder='请输入周期数'
                          value={info.periodSize}
                          onChange={(val)=>this.handleNum(val,'periodSize')}
                        />
                      </View>
                  </AtList>
                  <AtSwitch 
                    title='连续填报' 
                    checked={info.isStrict == 1 ? true :false} 
                    onChange={(val)=>this.handlePeopleLimit(val,1,'isStrict')}
                  />
                  </View>
                )}
                <AtListItem
                  title='允许填报人修改'
                  isSwitch
                  switchIsCheck={info.canEdit == 1 ? true :false} 
                  onSwitchChange={(val)=>this.handleChange(val,'canEdit')} 
                />
                <AtListItem
                  title='填报密码'
                  isSwitch
                  switchIsCheck={info.needPwd == 1 ? true :false}  
                  onSwitchChange={(val)=>this.handleChange(val,'needPwd')} 
                />
                {info.needPwd == 1 && (
                  <AtList>
                    <View className='set-cycle'>
                      <View>设置密码</View>
                      <Input 
                        type='text' 
                        placeholder='请输入填报密码'
                        value={info.pwd}
                        onChange={(val)=>this.handleNum(val,'pwd')} 
                      />
                    </View>
                </AtList>
                )}
                
          </AtList>
          <View className='set-publisher'>
            <View>发布人昵称</View>
            <Input 
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