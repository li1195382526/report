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

class Release extends Component {
  config = {
    navigationBarTitleText: '发布填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
  
  };


  render() {
    return (
      <View className='release'>
        <View className='release-check'>
          <AtIcon value='check-circle' size='100' color='#71a0f7'></AtIcon>
        </View>
        <View className='release-text'>
          发布成功
        </View>
        <View className='release-mes'>
          填报已发布成功，您可将填报分享到微信群内
        </View>
        <View className='release-btn'>
          <View>
            <AtButton type='primary' className='btn' openType='share'>分享微信群</AtButton>
          </View>
          <View>
            <AtButton type='secondary'>生成二维码</AtButton>
          </View>
          <View>
            <AtButton loading type='primary'>修改填报内容</AtButton> 
          </View>
        </View>
        
      </View>
    )
  }
}

export default Release;
