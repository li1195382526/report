import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class Charttext extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const {qt} = this.props
    return (
      <View className='ChartText-wrap'>
        <View className='questionText'>
          {qt.qtText}
        </View>
      </View>
    )
  }
}

export default Charttext
