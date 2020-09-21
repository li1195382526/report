import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtTextarea, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
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
      multipleList: this.props.nameData
    }
    this.titleChange = this.titleChange.bind(this)
    this.handleSubUsername = this.handleSubUsername.bind(this)
    this.handleAddMultiple = this.handleAddMultiple.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onClose = this.onClose.bind(this)
    this.getName = this.getName.bind(this)
    this.bindNum = this.bindNum.bind(this)
  }

  componentWillMount() {
    this.getName()
  };

  // 库名称change
  titleChange () {

  }
  componentDidMount() {
  }

  getName() {
    const listId = this.$router.params.id
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
      multipleInfo: username
    })
  }

  // 批量添加
  handleAddMultiple() {
    this.setState({
      isOpen: true
    })
  }
  // 弹框确定
  onConfirm() {
    const { multipleInfo } = this.state
    const { nameData } = this.props
    let list = multipleInfo.split(/\s/) // 回车符
    list = [...new Set(list)]
    let data = []
    list.forEach((item, index) => {
      if(item) {
        let obj = {
          id: '',
          num: '',
          name: item.split(/[,，]/g)[0],
          limit: item.split(/[,，]/g).slice(1),
          status: 1
        }
        data.push(obj)
      }
    })
    this.props.dispatch({
      type: 'dataList/uploadList',
      payload: nameData.concat(data),
    })
    this.onClose()
  }
  // 关闭弹框
  onClose() {
    this.setState({
      isOpen: false,
      value: '',
      multipleInfo: ''
    })
  }
  // 关联按钮
  bindNum(item) {

  }
  // 删除单条人员
  delItem() {

  }
  render() {
    const { isOpen } = this.state
    const { nameData, title } = this.props
    console.log('render---------')
    console.log(nameData)
    return (
      <View className='namelist'>
        <View>
          <View className='title'>标签名称</View>
          <View className='title-name'>
            <View >
              <AtTextarea
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
        <View className='header-color'>
          <View className='header'>
            <View>
              编号
            </View>
            <View style={{ marginRight: '70px' }}>
              预设名字
            </View>
            <View>
              填报人员
            </View>
          </View>
        </View>

        {nameData.map((item, key) => (
          item.status == 1 && <View className='table'>
            <View style={{ marginLeft: '30px' }}>{`${key + 1}.`}</View>
            <View className='name-text'>
              <input type="text" placeholder='名字' value={item.name} />
            </View>
            <View onClick={this.bindNum(item)}>关联</View>
            <View onClick={this.delItem(key)}><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
          </View>
        ))}
        <View className='namelist-add'>
          <View className='edit-add' onClick={this.handleAddMultiple}>批量添加</View>
          <View className='edit-add' >单个添加</View>
        </View>
        <View className="save-change">保存名单</View>
        {/* 批量添加弹框 */}
        <AtModal isOpened={isOpen}>
          <AtModalHeader>导入填报名单</AtModalHeader>
          <AtModalContent>
            {/* <AtTextarea
              className="model-input"
              value=''
              onChange={this.handleSubUsername}
              placeholder='请输入/粘贴微信绑定的手机号'
            /> */}
            <AtTextarea
              count={false}
              value={this.state.value}
              onChange={this.handleSubUsername}
              height={200}
              maxLength={200}
              placeholder='请输入名单，以及名单关联的填报人员微信手机号，参考以下示例：
              小明，13545678921,15637493638
              小芳，15893839373,18737393738'
            />
            <View className='model-text'>可将名单信息粘贴后导入</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.onClose}>取消</Button>
            <Button onClick={this.onConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default NameList;
