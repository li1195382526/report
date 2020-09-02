import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'
import { AtButton } from 'taro-ui';

class BeginToCollect extends Component {
  static propTypes = {
    beginRetrieveData: PropTypes.func
  };

  static defaultProps = {
    beginRetrieveData: function () { }
  };

  render() {
    const { beginRetrieveData } = this.props
    return (
      <View className='beginToCollect-wrap'>
        <View className='infoRow at-row'>
          <View className='info at-col'>该问卷还没有发布，立即收集数据</View>
        </View>
        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-6'>
            <AtButton type='primary' circle onClick={beginRetrieveData}>开始收集</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default BeginToCollect
