import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon,AtButton } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ edit, home, common }) => ({
  ...edit,
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
    this.handleBack = this.handleBack.bind(this)
    this.edit = this.edit.bind(this)
    this.handleCode = this.handleCode.bind(this)
  }

  componentWillMount() {
  
  };

  //小程序分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    const id = this.$router.params.listId
    const titles = this.props.info.title
    const title = titles.length > 11 ? titles.substring(0,11)+'...'
    :titles
    return {
      title:  title,
      path: `/pages/answer/loadingStatus?listId=${id}`,
      imageUrl: 'https://www.epanel.cn/images/zhb-link.png'
    }
  }

  handleBack(){
    Taro.redirectTo({
      url: '/pages/home/index'
     })
  }

  //生成二维码
  handleCode(){
    const id = this.$router.params.listId
    Taro.navigateTo({
      url: `/pages/code/index?listId=${id}`
     })
  }

  edit() {
    const id = this.$router.params.listId
    Taro.navigateTo({url: `/pages/edit/index?reportId=${id}&isInit=2`})
  }


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
            <AtButton type='secondary' onClick={this.handleCode}>生成二维码</AtButton>
          </View>
          <View>
            <AtButton type='primary' onClick={this.edit}>修改填报内容</AtButton> 
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

export default Release;
