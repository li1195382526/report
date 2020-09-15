import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtForm  }  from 'taro-ui'
import './style/setting.scss'

class QtnSet extends Component {
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
      <View className='qt-set'>
         <View>必答</View>
         <View>删除</View>
      </View>
    )
  }
}

export default QtnSet
