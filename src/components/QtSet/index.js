import Taro, { Component } from '@tarojs/taro'
import { View,Picker,Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtList, AtListItem, AtFloatLayout, AtSwitch, AtIcon }  from 'taro-ui'
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
        hint:'',
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
      this.handleNotice = this.handleNotice.bind(this)
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
        hint: val === 1 ? "1、开启连续填报：连续周期内，每个周期仅填写一次，不可提前或延后填写其他周期 \n2、关闭连续填报：不限制填写时间，可随时填写所有周期内的数据。" : "开启填报限制后，仅允许每个名单关联的账号填报，其他微信账号不允许填报"
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
  handleNotice(val) {
    this.setState({
      isLimit: true,
      hint: val === 'Namelist' ? `1、什么类型的项目使用“填报名单”？\n您提前知晓参与项目的人员名单，那么您可直接使用“填报名单”快速导入或引用名单库导入参与人员名单，发布之后针对名单分享填报项目。\n2、如使用“填报名单”？\n · 您可通过三种方式创建添加名单：导入名单、引用名单库、单个添加名单人员。\n · 填报人员限制，该功能可对参与填报的人员进行限制，若添加名单时关联了填报手机号，那么开启“填报人员限制”后，仅允许关联的手机号参与填报。` : `1、什么情况使用“填报周期“？\n若您的项目要求参与者连续多期填写，那么您需要开启“填报周期”，完成设置后，您只需发布一次，即可让参与者连续填写多期。\n2、如何使用“填报周期”？\n · 设置“周期数”，即该项目需要参与者连续填写的期数\n · 设置“周期类型”（日/周/年），即该项目的填写周期是每日为一期，还是每周、每年为一期。`
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
            switchIsCheck={info.useTimelimit == 1 ? true : false}
            onSwitchChange={(val) => this.handleChange(val, 'useTimelimit')}
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
            onClose={() => this.handleBeginTimeSetting(false)}
          >
            <DateTimePicker initValue={info.beginTime}
              onOk={(val) => this.saveTime(val, "beginTime")}
              onClear={(val) => this.saveTime(val, "beginTime")}
            />
          </AtFloatLayout>
        )}
        {this.state.isShowExpireTime && (
          <AtFloatLayout isOpened={this.state.isShowExpireTime} title='结束时间设置' onClose={() => this.handleExpireTimeSetting(false)}>
            <DateTimePicker initValue={info.endTime}
              onOk={(val) => this.saveTime(val, "endTime")}
              onClear={(val) => this.saveTime(val, "endTime")}
            />
          </AtFloatLayout>
        )}
        <AtList>
          <AtListItem
            title='填写人数'
            disabled={!isModify}
            isSwitch
            switchIsCheck={info.useCount == 1 ? true : false}
            onSwitchChange={(val) => this.handleChange(val, 'useCount')}
          />
          {info.useCount == 1 && (
            <AtList>
              <View className='set-cycle'>
                <View style={{ color: isModify ? '' : '#c2c2c2' }}>设置人数</View>
                <Input type='number'
                  disabled={!isModify}
                  placeholder='请输入填报人数'
                  onChange={(val) => this.handleNum(val, 'pnlCount')}
                  value={info.pnlCount}
                  style={{ color: isModify ? '' : '#c2c2c2' }}
                />
              </View>
            </AtList>
          )}
          <View className="diy-list-item">
            <View className='title'>
              <Text style={{ marginRight: '6px', color: isModify ? '' : '#c2c2c2' }}>填报名单</Text>
              <AtIcon value='help' color={isModify ? '#666' : '#c2c2c2'} size='22' onClick={() => this.handleNotice('Namelist')}></AtIcon>
            </View>
            <View>
              <AtSwitch
                disabled={!isModify}
                checked={info.useNamelist == 1 ? true : false}
                onChange={(val) => this.handleChange({ target: { value: val } }, 'useNamelist')}
              />
            </View>
          </View>
          {info.useNamelist == 1 && (<AtListItem title='名单设置' extraText={nameSet} onClick={this.handleSetName} arrow='right' />)}
          {info.useNamelist == 1 && (
            <View className="diy-list-item">
              <View className='title'>
                <Text style={{ marginRight: '6px', color: isModify ? '' : '#c2c2c2' }}>填报人员限制</Text>
              </View>
              <View>
                <AtSwitch
                  disabled={!isModify}
                  checked={info.isUserlimit == 1 ? true : false}
                  onChange={(val) => this.handlePeopleLimit(val, 0, "isUserlimit")}
                />
              </View>
            </View>
          )}
          <View className="diy-list-item">
            <View className='title'>
              <Text style={{ marginRight: '6px', color: isModify ? '' : '#c2c2c2' }}>填写周期</Text>
              <AtIcon value='help' color={isModify ? '#666' : '#c2c2c2'} size='22' onClick={() => this.handleNotice('Period')}></AtIcon>
            </View>
            <View>
              <AtSwitch
                disabled={!isModify}
                checked={info.usePeriod == 1 ? true : false}
                onChange={(val) => this.handleChange({ target: { value: val } }, 'usePeriod')}
              />
            </View>
          </View>
          {info.usePeriod == 1 && (
            <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange} disabled={!isModify}>
                <AtList>
                  <AtListItem
                    title='周期类型'
                    disabled={!isModify}
                    extraText={
                      info.periodType.length === 0 ? "未设置" : this.state.selector[info.periodType]
                    }
                  />
                </AtList>
              </Picker>
              <AtList>
                <View className='set-cycle'>
                  <View style={{ color: isModify ? '' : '#c2c2c2' }}>连续周期数</View>
                  <Input
                    type='number'
                    disabled={!isModify}
                    placeholder='请输入周期数'
                    value={info.periodSize}
                    onChange={(val) => this.handleNum(val, 'periodSize')}
                    style={{ color: isModify ? '' : '#c2c2c2' }}
                  />
                </View>
              </AtList>
              <View className="diy-list-item">
                <View className='title'>
                  <Text style={{ marginRight: '6px', color: isModify ? '' : '#c2c2c2' }}>连续填报</Text>
                </View>
                <View>
                  <AtSwitch
                    disabled={!isModify}
                    checked={info.isStrict == 1 ? true : false}
                    onChange={(val) => this.handlePeopleLimit(val, 1, 'isStrict')}
                  />
                </View>
              </View>
            </View>
          )}
          <AtListItem
            title='允许填报人修改'
            disabled={!isModify}
            isSwitch
            switchIsCheck={info.canEdit == 1 ? true : false}
            onSwitchChange={(val) => this.handleChange(val, 'canEdit')}
          />
          <AtListItem
            title='填报密码'
            disabled={!isModify}
            isSwitch
            switchIsCheck={info.needPwd == 1 ? true : false}
            onSwitchChange={(val) => this.handleChange(val, 'needPwd')}
          />
          {info.needPwd == 1 && (
            <AtList>
              <View className='set-cycle'>
                <View style={{ color: isModify ? '' : '#c2c2c2' }}>设置密码</View>
                <Input
                  disabled={!isModify}
                  type='number'
                  placeholder='请输入填报密码'
                  value={info.pwd}
                  maxLength={4}
                  onChange={(val) => this.handleNum(val, 'pwd')}
                  style={{ color: isModify ? '' : '#c2c2c2' }}
                />
              </View>
            </AtList>
          )}
        </AtList>
        <View className='set-publisher'>
          <View style={{ color: isModify ? '' : '#c2c2c2' }}>发布人昵称</View>
          <Input
            disabled={!isModify}
            type='text'
            placeholder='示例:李老师'
            value={info.creatorName}
            onChange={(val) => this.handleNum(val, 'creatorName')}
            style={{ color: isModify ? '' : '#c2c2c2' }}
          />
        </View>
        <Model isLimit={isLimit} handleClose={this.handleClose} hint={hint} />
      </View>
    )
  }
}

export default QtSet
