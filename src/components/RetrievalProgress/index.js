import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Card } from '../card'
import './index.scss'

class RetrievalProgress extends Component {

  render() {
    let { RetrievalProgressData } = this.props
    let first = `${RetrievalProgressData.retrieveTotal || 0} / ${RetrievalProgressData.targetTotal || 0}`
    return (
      <View className='progress-wrap'>
       
        <Card count={first} info='回收总量/目标总量' />
        <Card count={RetrievalProgressData.visitTotal || 0} info='问卷访问总量' />
        <Card count={RetrievalProgressData.dayRetrieveNum || 0} info='今日回收量' />
        <Card count={RetrievalProgressData.retrieveRate} info='回收完成率' />
      </View>
    )
  }
}

export default RetrievalProgress
