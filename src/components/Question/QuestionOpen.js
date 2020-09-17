import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput }  from 'taro-ui'
import './Open/open.scss'
import QtnSet from './Choice/QtnSet'
import './Choice/style/open.scss'

class QuestionOpen extends Component {
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
      <View className='open'>
        <View className='open-text'>{opts.text}</View>
        <AtInput
            name='value'
            title={opts.text}
            type='text'
            placeholder='填空题'
            value={this.state.value}
            onChange={this.handleText}
          />
        <QtnSet opts={opts}/>
      </View>
    )
  }
}

export default QuestionOpen
