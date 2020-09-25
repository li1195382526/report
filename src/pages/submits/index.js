import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon,AtButton } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ Release, home, common }) => ({
  ...Release,
  ...home,
  ...common
}))

class Submits extends Component {
  config = {
    navigationBarTitleText: '提交填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.handleBack = this.handleBack.bind(this)
  }

  componentWillMount() {
  
  };

  //小程序分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:  '云调查',
      path: '/pages/answer/index?',
      imageUrl: 'https://www.epanel.cn/images/answer.jpg'
    }
  }

  handleBack(){
    Taro.navigateTo({
      url: '/pages/home/index'
     })
  }
  render() {
    return (
      <View className='release'>
        <View className='release-check'>
          <AtIcon value='check-circle' size='100' color='#71a0f7'></AtIcon>
        </View>
        <View className='release-text'>
          填报成功
        </View>
        <View className='release-mes'>
          填报提交成功，感谢您对速报的支持
        </View>
        <View className='release-btn'>
          <View>
            <AtButton type='primary' className='btn' openType='share'>我要创建</AtButton>
          </View>
          <View>
            <AtButton type='secondary'>修改填报</AtButton>
          </View>
          <View>
            <AtButton type='primary' className='view-data'>查看结果</AtButton> 
          </View>
        </View>
        <View className='release-bottom'>
          <View className='release-back' onClick={this.handleBack}>返回首页</View>
          <View className='copy-right'>版权所有 © 2017 refs.cn</View>
        </View>
      </View>
    )
  }
}

export default Submits;
