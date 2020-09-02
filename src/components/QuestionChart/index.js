import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import './index.scss'

class Questionchart extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    const { qt, isEmpty } = this.props
    const hasSub = qt && (
    qt.type === 3 || qt.type === 4 || (qt.type === 8 && qt.selectType === 4) )//如果是矩阵题或排序题或多项打分题

    const textProps = {
      qt,
      isEmpty,
    }
    const optProps = {
      qt,
      items: (qt && qt.items) || [],
      isEmpty
    }
    const subProps = {
      qt,
      isEmpty
    }

    return (
      <View className='QuestionChart-wrap'>
        <ChartText {...textProps} />
        {hasSub ? (
          <ChartSubTable {...subProps} />
        ) : (
          <ChartOptTable {...optProps} />
        )}
      </View>
    )
  }
}

export default Questionchart
