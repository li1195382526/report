import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtTextarea, AtMessage, AtBadge, AtButton } from 'taro-ui'
// import { BeginToCollect } from '../../components/beginToCollect'
// import { Quota } from '../../components/Quota'
// import { Link } from '../../components/link'
import './index.scss';

@connect(({ NameList, home, common, nameList, dataList }) => ({
  ...NameList,
  ...home,
  ...common,
  ...nameList,
  ...dataList
}))

class NameList extends Component {
  config = {
    navigationBarTitleText: '填报名单',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isOpen: false,
      imvalue: '',
      multipleInfo: '',
      isPool: false,
      poolTitle: '',
      bindKey: 0,
      isBindNum: false,
      devalue: ''
      
    }
    this.handleSubUsername = this.handleSubUsername.bind(this)
    this.handleImport = this.handleImport.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleQuote = this.handleQuote.bind(this)
    this.handleAddSingle = this.handleAddSingle.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.nameFocus = this.nameFocus.bind(this)
    this.poolTitleChange = this.poolTitleChange.bind(this)
    this.handleAddNameList = this.handleAddNameList.bind(this)
    this.onSave = this.onSave.bind(this)
    this.bindNum = this.bindNum.bind(this)
    this.onConfirmBind = this.onConfirmBind.bind(this)
    this.handleBind = this.handleBind.bind(this)
    this.delItem = this.delItem.bind(this)
    this.finish = this.finish.bind(this)
    this.initialization = this.initialization.bind(this)
  }

  componentWillMount() {

  };

  componentDidMount() {
    this.initialization()
  }

  // 初始数据
  initialization() {
    const from = this.$router.params.from
    if(from == 'dataList') { // 引用名单库的
      this.props.dispatch({
        type: 'nameList/mergeData'
      })
    } else if (from == 'edit') {
      this.props.dispatch({
        type: 'nameList/getData',
        payload: [{
          listIndex: 0,
          name: '',
          limit: [],
          status: 1
        }],
      })
    }
  }
  handleSubUsername(event) {
    const username = event.target.value.replace(/\t+/g, ',')
    // const newUsername = username.split(' ').join(',')
    this.setState({
      multipleInfo: username,
      imvalue:  event.target.value
    })
  }
  // 导入名单
  handleImport() {
    this.setState({
      isOpen: true
    })
  }
  // 导入名单弹框确定按钮
  onConfirm() {
    const { multipleInfo } = this.state
    let { tableList } = this.props
    let list = multipleInfo.split(/\s/g) // 回车符
    list = [...new Set(list)]
    list.forEach((item, index) => {
      if(item) {
        let obj = {
          listIndex: tableList[tableList.length - 1].listIndex + 1,
          name: item.split(/[,，]/g)[0],
          limit: item.split(/[,，]/g).slice(1),
          status: 1
        }
        tableList.push(obj)
      }
    })
    this.props.dispatch({
      type: 'nameList/uploadData',
      payload: tableList,
    })
    this.onClose()
  }
  // 弹框取消按钮
  onClose() {
    this.setState({
      isOpen: false,
      imvalue: '',
      multipleInfo: '',
      isPool: false,
      poolTitle: '',
      isBindNum: false,
      devalue: ''
    })
  }
  // 引用名单库
  handleQuote() {
    Taro.navigateTo({
      url: '/pages/dataList/index?from=nameList'
    })
  }
  // 单个添加
  handleAddSingle() {
    let { tableList } = this.props
    tableList.push({
      listIndex: tableList.length ? tableList[tableList.length - 1].listIndex + 1 : 0,
      name: '',
      limit: [],
      status: 1
    })
    this.props.dispatch({
      type: 'nameList/uploadData',
      payload: [...tableList],
    })
    this.onClose()
  }
  // 预设名字change
  nameChange(value) {
    let { tableList } = this.props
    let { bindKey } = this.state
    tableList[bindKey].name = value
    this.props.dispatch({
      type: 'nameList/uploadData',
      payload: tableList,
    })
  }
  nameFocus(key) {
    this.setState({bindKey: key})
  }
  // 名单标题change
  poolTitleChange(value) {
    this.setState({poolTitle: value})
  }
  handleAddNameList() {
    this.setState({isPool: true})
  }
  // 保存名单库
  onSave() {
    let { tableList, userinfo } = this.props
    let { poolTitle } = this.state
    let list = []
    for (let i of tableList) {
      let data = i.name + ',' + i.limit.join(',')
      list.push(data)
    }
    let params = {
      title: poolTitle,
      data: list.join(`\n`)
    }
    this.props.dispatch({
			type: 'dataList/create',
			payload: params,
			token: this.props.token,
			url: `/v3/reportuser/${userinfo.id}/namelist/create`
		})
  }
  // 关联按钮
  bindNum(key) {
    const { tableList } = this.props
    this.setState({isBindNum: true, bindKey: key, devalue: tableList[key] && tableList[key].limit ? tableList[key].limit.join(',') : ''})
  }
  // 关联确定按钮
  onConfirmBind() {
    const { multipleInfo, bindKey } = this.state
    let { tableList } = this.props
    let list = multipleInfo.split(/[,，]/g)
    list = [...new Set(tableList[bindKey].limit.concat(list))]
    tableList[bindKey].limit = list
    this.props.dispatch({
      type: 'nameList/uploadData',
      payload: tableList,
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
  // 删除单条人员
  delItem(key) {
    const { tableList } = this.props
    tableList.splice(key, 1)
    setTimeout(() => {
      this.props.dispatch({
        type: 'nameList/uploadData',
        payload: [...tableList],
      })
    }, 0);
  }
  // 完成
  finish() {
    Taro.redirectTo({
      url: '../edit/index'
    })
  }

  render() {
    const { isOpen, imvalue, poolTitle, isPool, isBindNum, devalue } = this.state
    const { tableList } = this.props
    return (
      <View className='namelist'>
        <AtMessage />
        <View className='list-import'>
          <View onClick={this.handleImport}>导入名单</View>
          <View onClick={this.handleQuote}>引用名单库</View>
        </View>
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
        {tableList.map((item, key) => (
          <View className='header-color' key={key}>
            <View className='table' key={key}>
              <View className='fix1'>{`${key + 1}.`}</View>
              <View className='fix2'>
                <AtInput
                  type='text'
                  placeholder='名字'
                  value={item.name}
                  onChange={this.nameChange}
                  onFocus={() => this.nameFocus(key)}
                />
              </View>
              <View  className='fix3 bind'>
                <AtBadge value={item.limit.length} maxValue={9}>
                  <AtButton size='small' onClick={()=>this.bindNum(key)} style={{position:'relative'}}>关联</AtButton>
                </AtBadge>
              </View>
              <View onClick={()=>this.delItem(key)} className='poicon'><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
            </View>
          </View>
        ))}
        <View className='namelist-add'>
          <View className='edit-add' onClick={this.handleAddSingle}>+ 继续添加</View>
        </View>
        <View className='edit-footer'>
					<View className='edit-save' onClick={this.handleAddNameList}>
						保存名单库
					</View>
					<View className='edit-send' onClick={this.finish}>完成</View>
				</View>

        {isOpen && (
          <AtModal isOpened={isOpen}>
            <AtModalHeader>导入填报名单</AtModalHeader>
            <AtModalContent>
              <AtTextarea
                showConfirmBar={true}
                count={false}
                value={imvalue}
                height={200}
                maxLength={200}
                onChange={this.handleSubUsername}
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
        {isPool && (
          <AtModal isOpened={isPool}>
            <AtModalHeader>保存名单</AtModalHeader>
            <AtModalContent>
              <View className='model-text'>将名单保存至名单库，方便下次直接引用</View>
              <AtInput
                type='text'
                placeholder='请输入名单分组名称'
                value={poolTitle}
                onChange={this.poolTitleChange}
              />
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.onClose}>取消</Button>
              <Button onClick={this.onSave}>保存</Button>
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
