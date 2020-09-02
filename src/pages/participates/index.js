import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane, AtNavBar,AtCard } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';
import Participate from '../participate';

@connect(({ Participates, home, common }) => ({
  ...Participates,
  ...home,
  ...common
}))

class Participates extends Component {
  config = {
    navigationBarTitleText: '收集数据',
  };

  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  componentWillMount() {
   
  };

  handleClick(value) {
    console.log(value)
  this.setState({
    current: value,
    open: true
  })
  Taro.navigateTo({
      url: '/pages/viewData/index'
    })
}

  render() {
    return (
      <View className='page'>
          <View className='participate-list'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.handleClick.bind(this)}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
          <View className='create-qt'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.handleClick.bind(this)}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
          <View className='create-qt'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.handleClick.bind(this)}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
      </View>
    )
  }
}

export default Participates;
