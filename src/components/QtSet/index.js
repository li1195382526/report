import Taro, { Component } from '@tarojs/taro'
import { View,Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import {AtList,AtListItem, AtFloatLayout}  from 'taro-ui'
import './index.scss'
import { DateTimePicker } from '../../components/DateTimePicker'
import Model from '../Model/model'

class QtSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
        timeSel: '12:01',
        dateSel: '2018-04-22',
        setName:false,
        isSetTime:false,
        isShowBeginTime: false,
        isShowExpireTime: false,
        beginTime:'',
        expireTime:'',
        isSetNum:false,
        num:'',
        isLimit:false,
        selector: ['日', '周', '月', '年'],
        selectorChecked: '日',
        cycle:'',
        hint:''
      }
      this.handelSetName = this.handelSetName.bind(this)
      this.handleName = this.handleName.bind(this)
      this.handleTime = this.handleTime.bind(this)
      this.handlePeople = this.handlePeople.bind(this)
      this.handleNum = this.handleNum.bind(this)
      this.handleBeginTimeSetting = this.handleBeginTimeSetting.bind(this)
      this.handleExpireTimeSetting = this.handleExpireTimeSetting.bind(this)
      this.saveBeginTime = this.saveBeginTime.bind(this)
      this.clearBeginTime = this.clearBeginTime.bind(this)
      this.clearExpireTime = this.clearExpireTime.bind(this)
      this.saveExpireTime = this.saveExpireTime.bind(this)
      this.handlePeopleLimit = this.handlePeopleLimit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.handleCycle = this.handleCycle.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handlePassword = this.handlePassword.bind(this)
  }

  handleChange(){

  }

  handleName (){
      this.setState({
        setName:true
      })
  }


  //设置名单
  handelSetName(){
    Taro.navigateTo({
      url: '/pages/nameList/index'
     })
  }

  //设置时间
  handleTime(){
    const {isSetTime} = this.state
    this.setState({
      isSetTime:!isSetTime
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

     // 保存截至时间设置
  saveExpireTime({ current }){
    this.setState({
      expireTime: current,
      isShowExpireTime:false
    })
  }

  // 清除截止时间设置
  clearExpireTime () {
    this.setState({
      expireTime: '',
      isShowExpireTime:false
    })
  }

  //填写人数
  handlePeople(value){
      this.setState({
        num:value
      })
  }

  //开启设置填报人数
  handleNum(){
    const {isSetNum} = this.state
    this.setState({
        isSetNum:!isSetNum
    })
  }

   // 保存开始时间设置
   saveBeginTime({ current }) {
      this.setState({
        beginTime: current,
        isShowBeginTime:false
      })
  }

  // 清除开始时间设置
  clearBeginTime () {
    this.setState({
      beginTime:'',
      isShowBeginTime:false
    })
  }

  //开启限制人员
  handlePeopleLimit(val){
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
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  handleCycle(){

  }

  handlePassword(){

  }
  
  render() {
    const {setName,isSetTime,beginTime,expireTime,isSetNum,num,isLimit,cycle,hint} = this.state
    let beginTimeList = !!beginTime ? beginTime :'未设置'
    let expireTimeList = !!expireTime ? expireTime :'未设置'
    return (
        <View className='qtn-setting'>
        <View>
            <AtList>
              <AtListItem
                  title='时间限制'
                  isSwitch
                  onSwitchChange={this.handleTime}
                />
                {isSetTime && (
                  <View>
                  <AtListItem title='开始时间'
                      arrow={ 'right'}
                      extraText={beginTimeList}
                      onClick={()=>this.handleBeginTimeSetting(true)}
                    />
                    <AtListItem title='结束时间'
                      arrow={'right'}
                      extraText={expireTimeList}
                      onClick={ ()=>this.handleExpireTimeSetting(true)}
                    />
                </View>
                )}
            </AtList>
            
              <AtFloatLayout isOpened={this.state.isShowBeginTime} title='开始时间设置'
              onClose={()=>this.handleBeginTimeSetting( false)}>
              <DateTimePicker initValue={this.state.beginTime}
                onOk={this.saveBeginTime}
                onClear={this.clearBeginTime} />
            </AtFloatLayout>
             <AtFloatLayout isOpened={this.state.isShowExpireTime} title='结束时间设置'
              onClose={()=>this.handleExpireTimeSetting(false)}>
              <DateTimePicker initValue={this.state.expireTime}
                onOk={this.saveExpireTime}
                onClear={this.clearExpireTime} />
            </AtFloatLayout> 
           
          </View>
          <AtList>
              <AtListItem
                  title='填写人数'
                  isSwitch
                  onSwitchChange={this.handleNum}
                />
                {isSetNum && (
                  <AtList>
                  <View className='set-cycle'>
                    <View>设置人数</View>
                    <Input type='text' placeholder='请输入填报人数'/>
                  </View>
                  </AtList>
                )}
              <AtListItem
                title='填报名单'
                isSwitch
                onSwitchChange={this.handleName}
              />
              {setName && (<AtListItem title='名单设置'  extraText='未设置' onClick={this.handelSetName} arrow='right'/>)}
              {setName && (
                <AtListItem
                  title='填报人员限制'
                  isSwitch
                  onSwitchChange={()=>this.handlePeopleLimit(0)}
                />
              )}  
                <AtListItem
                  title='填写周期'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                 <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                  <AtList>
                    <AtListItem
                      title='周期类型'
                      extraText={this.state.selectorChecked}
                    />
                  </AtList>
                </Picker>
                <AtList>
                    <View className='set-cycle'>
                      <View>连续周期数</View>
                      <Input type='text' placeholder='请输入周期数'/>
                    </View>
                </AtList>
                 <AtListItem
                  title='连续填报'
                  isSwitch
                  onSwitchChange={()=>this.handlePeopleLimit(1)}
                />
                <AtListItem
                  title='允许填报人修改'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                <AtListItem
                  title='填报密码'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                <AtList>
                    <View className='set-cycle'>
                      <View>设置密码</View>
                      <Input type='text' placeholder='请输入填报密码'/>
                    </View>
                </AtList>
          </AtList>
          <View className='set-publisher'>
            <View>发布人昵称</View>
            <Input type='text' placeholder='示例:李老师'/>
          </View>
          <Model isLimit={isLimit} handleClose={this.handleClose} hint={hint}/>
        </View>
    )
  }
}

export default QtSet
