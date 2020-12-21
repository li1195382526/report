import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MultipleChoice from './Choice/MultipleChoice'
import SingleChoice from './Choice/SingleChoice'
import './index.scss'

class QuestionChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
      }
  }

  static defaultProps = {
    opts: {}
  };
  handleChange (value) {
    this.setState({
      value
    })
  }
  
  render() {
    const {opts} = this.props
    return (
      <View className='choice'>
          {/* 单选0 多选2 */}
            {opts.selectType === 0 &&  <SingleChoice opts={opts} />}
            {opts.selectType === 1 &&  <MultipleChoice opts={opts} />}
      </View>
    )
  }
}

export default QuestionChoice
