import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class Quota extends Component {
  static propTypes = {
    quota: PropTypes.func
  };

  static defaultProps = {
    quota: function () { }
  };

  render() {
      const { QuotaList } = this.props
    return (
      <View className='Quota-wrap'>
    
      </View>
    )
  }
}

export default Quota
