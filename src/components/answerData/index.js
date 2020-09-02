import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import cx from 'classnames'
import { formatOnlyDate } from '../../utils/common'
import './index.scss'

class AnswerData extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { data, onShowResult, view } = this.props

    return (
      <View className='answerData-wrap'>
        <View className='table'>
          <View className='tr'>
            <View className='th'>答题序号</View>
            <View className='th'>答题状态</View>
            <View className='th'>结束时间</View>
            <View className='th'>操作</View>
          </View>

          {data && data.map((item, index) => (
            <View className='tr' key={item.resultId}>
              <View className='td'>{item.resultId}</View>
              <View className={cx({
                finish: item.status === 29,
                answering: item.status === 20,
                other: item.status !== 29 && item.status !== 20,
                td: true
              })}>
                {item.answerStatusDescn}
              </View>
              <View className='td'>{item.endTime ? formatOnlyDate(item.endTime) : '--'}</View>
              <View className='td'><Text onClick={onShowResult.bind(this, item.resultId, index, view)}>查看</Text></View>
            </View>
          ))}

        </View>
      </View>
    )
  }
}

export default AnswerData