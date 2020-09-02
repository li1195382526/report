import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { QuestionChart } from '../QuestionChart'
import './index.scss'

class Chartdata extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { data } = this.props

    return (
      <View className='chartData-wrap'>
        {data && data.map((qt, key) => {
          const isEmpty =
            (!qt.items || qt.items.length === 0) &&
            (!qt.subModels || qt.subModels.length === 0)
          return <QuestionChart qt={qt} isEmpty={isEmpty} key={key} />
        })}
      </View>
    )
  }
}

export default Chartdata
