import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import './index.scss'

class ChartSubTable extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  getOptTabel(sub) {
    const {isEmpty} = this.props
    const optProps = {
      qt: sub,
      items: sub.items || [],
      isEmpty
    }
    return <ChartOptTable {...optProps} />
  }
  render() {
    const {qt} = this.props

    return (
      <View className='ChartSubTable-wrap'>
        {qt && qt.subModels.map((sub, key) => (
          <View key={qt.qtMySeq}>
            <View className='subText'>
              {sub.qtText}
            </View>
            {this.getOptTabel(sub)}
          </View>
        ))}
      </View>
    )
  }
}

export default ChartSubTable
