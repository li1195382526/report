import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as Utils from '../../utils/common'
import './index.scss'

class Answeroptlist extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { optList } = this.props

    return (
      <View className='optlist'>
        {optList && optList.map((opt, key) => (
          <View className='at-row opt' key={key || 0}>
            <View className='at-col at-col__offset-1' >
              {Utils.strip(opt.label)}
            </View>
            <View className='at-col'  >
              {Utils.strip(opt.text)}
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default Answeroptlist
