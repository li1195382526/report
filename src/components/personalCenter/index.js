import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import { AtGrid,AtListItem } from "taro-ui"
import './index.scss'

class PersonalCenter extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {

    return (
      <View className='personal'>
        <View className='personal-login'>
            <View>
                微信昵称
            </View>
            <View>
                立即登录
            </View>
        </View>
        <View>
        <AtListItem title='标题文字' arrow='right' />
        <AtListItem title='标题文字' arrow='right' />
        <AtListItem title='标题文字' arrow='right' />
        <AtListItem title='标题文字' arrow='right' />
        </View>
      </View>
    )
  }
}

export default PersonalCenter
