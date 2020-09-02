import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as Utils from '../../utils/common'
import './index.scss'

class AnswerOpenList extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { optList, selectType } = this.props

    return (
      <View className='AnswerOpenList-wrap'>
        {optList && optList.map((opt, key) => (
          <View key={key || 0}>
            {selectType === 2 && (
              <View className='at-row'>
                <View className='at-col at-col__offset-1'>{Utils.strip(opt.label)}</View>
              </View>
            )}
            <View className='at-row'>
              <View className='at-col at-col__offset-1 optText'>{Utils.strip(opt.text)}</View>
              <View className='at-col'>{Utils.strip(opt.postLabel)}</View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default AnswerOpenList
