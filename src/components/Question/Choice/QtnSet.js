import Taro, { Component } from '@tarojs/taro'
import { View,Checkbox } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon  }  from 'taro-ui'
import './style/setting.scss'

class QtnSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:'',
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
         <View><Checkbox value='选中' checked={opts.required}></Checkbox> 必答</View>
         <View><AtIcon value='trash' size='25' color='#ccc'></AtIcon></View>
      </View>
    )
  }
}

export default QtnSet
