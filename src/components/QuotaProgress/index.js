import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtCard } from 'taro-ui'
import './index.scss'

class QuotaProgress extends Component {
  static propTypes = {
    quotaProgress: PropTypes.func
  };

  static defaultProps = {
    quotaProgress: function () { }
  };

  render() {
      const { data } = this.props
    return (
      <View className='Quota-wrap'>
         {data && data.map((item, index) => (
            <View className='Quota-wrap-AtCard'>
              <AtCard
                note={`配额数量:${item.target}`}
                extra={`回收数量:${item.achieve}`}
                title={`配额条件:${item.quotaCondition}`}
                extraStyle={{color:'rgb(255, 172, 59)'}}
              >
                {`完成状态:${item.clazz ? '完成':'未完成'}`}
              </AtCard>
            </View>
          ))}
      </View>
    )
  }
}

export default QuotaProgress
