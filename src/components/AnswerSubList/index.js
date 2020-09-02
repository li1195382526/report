import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as Utils from '../../utils/common'
import './index.scss'

class AnswerSubList extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { subList } = this.props

    return (
      <View className='AnswerSubList-wrap'>
        {subList && subList.map((sub, key) => (
          <View key={key || 0}>
            <View className='at-row'>
              <View className='at-col at-col__offset-1 subDesc'>{Utils.strip(sub.subDescn)}</View>
            </View>
            {sub.optList.map((opt) => (
              <View className='at-row sub' key={opt.mySeq}>
                <View className='at-col at-col__offset-1 sublabel'>{Utils.strip(opt.label)}</View>
                <View className='at-col' >{Utils.strip(opt.text)}</View>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}

export default AnswerSubList
