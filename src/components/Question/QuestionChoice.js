import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'
import MultipleChoice from './Choice/MultipleChoice'
import SingleChoice from './Choice/SingleChoice'
import QuestionBottom from './Choice/QuestionBottom'
import QtnSet from './Choice/QtnSet'
import './Choice/style/choice.scss'

class QuestionChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
      }
  }

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
            {opts.selectType === 0 &&  <SingleChoice opts={opts}/>}
            {opts.selectType === 1 &&  <MultipleChoice opts={opts}/>}
            <QuestionBottom opts={opts} />
            <QtnSet opts={opts} />
      </View>
    )
  }
}

export default QuestionChoice
