import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import { AtGrid,AtListItem,AtAvatar } from "taro-ui"
import './index.scss'

class PersonalCenter extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  handelListDataBase(){
      
  }
  render() {

    return (
      <View className='personal'>
        <View className='personal-login'>
          <View className='head-img'>
            <AtAvatar image='https://jdc.jd.com/img/200' circle={true} size='300' ></AtAvatar>
          </View>
        <View className='wechat-name'>
          <View>
                微信昵称
            </View>
            <View>
                立即登录
            </View>
        </View>
            
        </View>
        <View>
        <AtListItem title='发布名单库' arrow='right' onClick={this.handelListDataBase.bind(this)} />
        <AtListItem title='标题文字' arrow='right' />
        <AtListItem title='标题文字' arrow='right' />
        <AtListItem title='标题文字' arrow='right' />
        </View>
      </View>
    )
  }
}

export default PersonalCenter
