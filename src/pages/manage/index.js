import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtTextarea, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtMessage, AtInput, AtButton, AtBadge } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ dataList, home, common }) => ({
  ...dataList,
  ...home,
  ...common
}))

class NameList extends Component {
  config = {
    navigationBarTitleText: '管理名单',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isOpen: false,
      multipleInfo: '',
      multipleList: this.props.nameData,
      isBindNum: false,
      bindKey: 0,
      newtitle: '',
      devalue: '',
    }
    this.titleChange = this.titleChange.bind(this)
    this.handleSubUsername = this.handleSubUsername.bind(this)
    this.handleAddMultiple = this.handleAddMultiple.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onClose = this.onClose.bind(this)
    this.getName = this.getName.bind(this)
    this.bindNum = this.bindNum.bind(this)
    this.onConfirmBind = this.onConfirmBind.bind(this)
    this.handleBind = this.handleBind.bind(this)
    this.save = this.save.bind(this)
    this.delItem = this.delItem.bind(this)
    this.handleAddSingle = this.handleAddSingle.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.nameFocus = this.nameFocus.bind(this)
  }

  componentWillMount() {
    this.getName()
  };

  // 库名称change
  titleChange (event) {
    this.setState({newtitle: event.target.value})
  }
  componentDidMount() {

  }

  getName() {
    const listId = this.$router.params.listId
    const { userinfo } = this.props
    this.props.dispatch({
      type: 'dataList/getName',
      token: this.props.token,
      url: `/v3/reportuser/${userinfo.id}/namelist/${listId}`
    })
  }
  // 输入框change
  handleSubUsername(event) {
    const username = event.target.value.replace(/\t+/g, ',')
    this.setState({
      multipleInfo: username,
      value: event.target.value
    })
  }

  // 批量添加
  handleAddMultiple() {
    this.setState({
      isOpen: true
    })
  }
  // 批量弹框确定
  onConfirm() {
    const { multipleInfo } = this.state
    let nameData = JSON.parse(JSON.stringify(this.props.nameData))
    let list = multipleInfo.split(/\s/g) // 回车符
    list = [...new Set(list)]
    let newlist = list.filter(i => i)
    for(let item of newlist){
      let limit = item.split(/[,，]/g).slice(1).filter(m => m)
      if(limit.length) {
        for(let i of limit) {
          if(!/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(i)) {
            Taro.atMessage({
              message: `'${i}'号码格式有误，请仔细核对您的输入`,
              type: 'error'
            })
            return
          }
        }
        let obj = {
          listIndex: nameData.length ? nameData[nameData.length - 1].listIndex + 1 : 1,
          name: item.split(/[,，]/g)[0],
          limit,
          status: 1
        }
        nameData.push(obj)
      }
    }
    this.props.dispatch({
      type: 'dataList/uploadData',
      payload: nameData,
    })
    this.onClose()
  }
  // 关闭弹框
  onClose() {
    this.setState({
      isOpen: false,
      value: '',
      devalue: '',
      multipleInfo: '',
      isBindNum: false,
    })
  }
  // 删除单条人员
  delItem(key) {
    const { nameData } = this.props
    nameData.splice(key, 1)
    setTimeout(() => {
      this.props.dispatch({
        type: 'dataList/uploadData',
        payload: [...nameData],
      })
    }, 0);
  }
  // 关联按钮
  bindNum(key) {
    const { nameData } = this.props
    this.setState({isBindNum: true, bindKey: key, devalue: nameData[key] && nameData[key].limit ? nameData[key].limit.join(',') : ''})
  }
  // 关联确定按钮
  onConfirmBind() {
    const { multipleInfo, bindKey } = this.state
    const { nameData } = this.props
    let list = multipleInfo.split(/[,，]/g)
    list = [...new Set(nameData[bindKey].limit.concat(list))]
    let newlist = list.filter(item => item)
    for(let i of newlist) {
      if(!/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(i)) {
        Taro.atMessage({
          message: `'${i}'号码格式有误，请仔细核对您的输入`,
          type: 'error'
        })
        return
      }
    }
    nameData[bindKey].limit = list
    this.props.dispatch({
      type: 'dataList/uploadData',
      payload: nameData,
    })
    this.onClose()
  }
  // 关联change
  handleBind(event) {
    const username = event.target.value.replace(/\s/g, ',')
    this.setState({
      multipleInfo: username,
      devalue: event.target.value
    })
  }
  // 保存
  save() {
    let { newtitle } = this.state
    const { nameData, title } = this.props
    newtitle = newtitle ? newtitle.replace(/(^\s*)|(\s*$)/g, "") : title
    if(!newtitle) { // 标题非空
      Taro.atMessage({
        'message': '标签名称为必填项，请检查您的输入',
        'type': 'warning',
        'duration': 2500
      })
      return
    }
    for (let item of nameData) { // 名字和电话非空
      if(!item.name || !item.limit.length) {
        Taro.atMessage({
          'message': '请您补齐所有预设名字与关联号码',
          'type': 'error',
        })
        return
      }
    }
    let params = {
      title: newtitle,
      data: nameData
    }
    this.props.dispatch({
      type: 'dataList/saveList',
      payload: params,
      url: `/v3/reportuser/${this.$router.params.userId}/namelist/${this.$router.params.listId}`
    })
  }
  // 单个添加
  handleAddSingle() {
    const { nameData } = this.props
    nameData.push({
      listIndex: nameData.length ? nameData[nameData.length - 1].listIndex + 1 : 1,
      name: '',
      limit: [],
      status: 1
    })
    this.props.dispatch({
      type: 'dataList/uploadData',
      payload: [...nameData],
    })
  }
  // 预设名字change
  nameChange(value) {
    let { nameData } = this.props
    let { bindKey } = this.state
    nameData[bindKey].name = value
    this.props.dispatch({
      type: 'dataList/uploadData',
      payload: nameData,
    })
  }
  nameFocus(key) {
    this.setState({bindKey: key})
  }

  render() {
    const { isOpen, isBindNum, value, devalue } = this.state
    const { nameData, title } = this.props
    return (
      <View className='namelist'>
        <AtMessage />
        <View>
          <View className='title'>标签名称</View>
          <View className='title-name'>
            <View >
              <AtTextarea
                showConfirmBar={true}
                className='title-input'
                count={false}
                value={title}
                height={50}
                onChange={this.titleChange}
                maxLength={200}
                placeholder='库名称'
              />
            </View>
          </View>
        </View>
        <View className='title'>详细人员</View>
        <View className='content'>
          <View className='header-color'>
            <View className='header'>
              <View className="fix1">
                编号
              </View>
              <View className="fix2">
                预设名字
              </View>
              <View className="fix3">
                填报人员
              </View>
            </View>
          </View>
          {nameData.map((item, key) => (
            <View className='header-color'>
              <View className='table' key={key}>
                <View className='fix1'>{`${key + 1}.`}</View>
                <View className='fix2'>
                  {/* <input type="text" placeholder='名字' value={item.name} onChange={() => this.nameChange(key)} /> */}
                  <AtInput
                    type='text'
                    placeholder='名字'
                    value={item.name}
                    onChange={this.nameChange}
                    onFocus={() => this.nameFocus(key)}
                  />
                </View>
                <View className='fix3 bind'>
                  <AtBadge value={item.limit.length} maxValue={9}>
                    <AtButton size='small'  onClick={()=>this.bindNum(key)}>关联</AtButton>
                  </AtBadge>
                </View>
                <View onClick={()=>this.delItem(key)} className='poicon'><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
              </View>
            </View>
          ))}
          <View className='namelist-add'>
            <View className='edit-add' onClick={this.handleAddMultiple}>批量添加</View>
            <View className='edit-add' onClick={this.handleAddSingle} >单个添加</View>
          </View>
        </View>
        <View className="save-change" onClick={this.save}>保存名单</View>

        {/* 批量添加弹框 */}
        {isOpen && (
          <AtModal isOpened={isOpen} closeOnClickOverlay={false}>
            <AtModalHeader>导入填报名单</AtModalHeader>
            <AtModalContent>
              <AtTextarea
                showConfirmBar={true}
                count={false}
                value={value}
                onChange={this.handleSubUsername}
                height={200}
                maxLength={200}
                placeholder={`请输入名单，以及名单关联的填报人员微信手机号，参考以下示例：\n小明,13555555555\n小芳，15888888888`}
              />
              <View className='model-text'>可将名单信息粘贴后导入</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.onClose}>取消</Button>
              <Button onClick={this.onConfirm}>确定</Button>
            </AtModalAction>
          </AtModal>
        )}
        {/* 关联弹框 */}
        {isBindNum && (
          <AtModal isOpened={isBindNum} closeOnClickOverlay={false}>
            <AtModalHeader>关联填报账号</AtModalHeader>
            <AtModalContent>
              <AtTextarea
                showConfirmBar={true}
                count={false}
                value={devalue}
                onChange={this.handleBind}
                height={200}
                maxLength={200}
                placeholder={`请输入/粘贴微信绑定的手机号，示例：\n15666666666,18777777777`}
              />
              <View className='model-text'>仅允许关联的账号填报</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.onClose}>取消</Button>
              <Button onClick={this.onConfirmBind}>确定</Button>
            </AtModalAction>
          </AtModal>
        )}
      </View>
    )
  }
}

export default NameList;
