import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import { AtGrid } from "taro-ui"
import './index.scss'

class TemplateText extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {

    return (
      <View className='tempalate-box'>
        <View className='list'>
          暑假打卡情况
        </View>
        <View className='list'>
          每日健康打卡
        </View>
        <View className='list'>
          暑假开学记录
        </View>
        <View className='list'>
          秋游地点投票
        </View>
        <View className='list'>
          孩子身高统计
        </View>
        <View className='list'>
         暑假开学记录
        </View>
        <View className='list'>
         每日健康打卡
        </View>
      </View>
    )
  }
}

export default TemplateText
