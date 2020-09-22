import Taro, { Component } from '@tarojs/taro'
import { View,Radio } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtInput, AtIcon  }  from 'taro-ui'
import './style/choice.scss'
import { connect } from '@tarojs/redux';

@connect(({ edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class SingleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          value:false
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value){
    console.log(value)
  }

  render() {
    const {opts} = this.props
    return (
      <View className='single-choice'>
        {opts.optlist.map((val)=>(
          <View className='single-opts'>
            <View>{val.label}</View>
            <View>
              <Radio value='选中' checked={this.state.value} onClick={this.handleChange}></Radio>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default SingleChoice
