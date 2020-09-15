import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'
import './Open/open.scss'

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
    console.log(opts)
    return (
      <View className='open'>
        填空
         
      </View>
    )
  }
}

export default QuestionOpen
