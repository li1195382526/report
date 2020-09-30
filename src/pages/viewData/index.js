import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem, AtSteps, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ ViewData, home, common }) => ({
  ...ViewData,
  ...home,
  ...common
}))

class ViewData extends Component {
  config = {
    navigationBarTitleText: '填报记录',
  };

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      isFinished: true, // 默认先展示已填报的
      isMenge: false,
      itemInfo: {}
    }
    this.handelToggle = this.handelToggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleView = this.handleView.bind(this)
    this.delItem = this.delItem.bind(this)
    this.cancel = this.cancel.bind(this)
    this.share = this.share.bind(this)
  }

  componentWillMount() {
   
  };

  // 列表点击
  handleClick(item) {
    const {isFinished} = this.state
    if(isFinished) {
      this.setState({isMenge: true, itemInfo: item})
    } else {
      Taro.updateShareMenu({
        withShareTicket: true,
        success () {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        }
      })
    }
  }
  // 步骤条change事件
  onChange (current) {
    this.setState({
      current
    })
  }
  // 已填报/未填报点击
  handelToggle() {
    let {isFinished} = this.state
    this.setState({isFinished: !isFinished})
  }
  // 查看记录
  handleView() {

  }
  // 删除记录
  delItem() {

  }
  cancel() {
    this.setState({isMenge: false})
  }
  share() {
    
  }

  render() {
    const {isFinished, isMenge} = this.state
    const items = [
      { 'title': ''},
      { 'title': '' },
      { 'title': '' }
    ]
    const list = isFinished ? [{}] : [{}, {}]
    return (
      <View className='view'>
        <View className='view-data'>
           <AtSteps
            className='data-step'
            items={items}
            current={this.state.current}
            onChange={this.onChange}
           />
           <View className='view-text'>当前进行至第2期</View>
        </View>
        <View className='view-statistics'>
          <View className={isFinished?'view-num view-num-checked':'view-num'} onClick={this.handelToggle}>
            <View className='num'>4</View>
            <View>已填报人数</View>
          </View>
          <View className={isFinished?'view-num':'view-num view-num-checked'} onClick={this.handelToggle}>
            <View className='num'>6</View>
            <View>未填报人数</View>
          </View>
        </View>
        <AtList className='view-atlist'>
          {list.map((item, index) => (
            <AtListItem key={index} title={`${index+1}. 李琴`} onClick={() => this.handleClick(item)} extraText={isFinished?'2020-08-24 10:35填报':'督促填报'} arrow='right'  />
          ))}
          {list.length == 0 && <View>暂无数据</View>}
        </AtList>
        {!isFinished && <Button className='view-radius' openType='share' onClick={this.share}>全部督促</Button>}
        <AtActionSheet isOpened={isMenge} onClose={this.cancel}>
          <AtActionSheetItem onClick={this.handleView}>
            查看记录
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.delItem}>
            删除记录
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.cancel}>
            取消
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default ViewData;
