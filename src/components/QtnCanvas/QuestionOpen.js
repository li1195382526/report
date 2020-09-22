import Taro, { Component } from '@tarojs/taro'
import { View,Input } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput }  from 'taro-ui'
import './index.scss'
import { connect } from '@tarojs/redux';

@connect(({ answer,home, common }) => ({
  ...answer,
  ...home,
  ...common
}))
class QuestionOpen extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
      
  }

  
  render() {
    const {opts} = this.props
    return (
      <View className='open'>
        <View className='open-text'>
          <Input type='text' className='open-input' />
        </View> 
      </View>
    )
  }
}

export default QuestionOpen
