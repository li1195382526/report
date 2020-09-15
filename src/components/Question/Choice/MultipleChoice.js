import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtForm  }  from 'taro-ui'
import './style/multi.scss'

class MultipleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
      }
      this.handleText = this.handleText.bind(this)
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
   
  }

  handleText(value){
    // this.setState({
    //   value
    // })
  }
  
  render() {
    const {opts} = this.props
    return (
      <View className=''>
          <AtInput
            name='value'
            title={opts.text}
            type='text'
            placeholder='多选题'
            value={this.state.value}
            onChange={this.handleText}
          />
          {opts.optList.map((item,key)=>(
           <AtInput
            name='value'
            title='选项'
            type='text'
            placeholder='选项'
            value={item.label}
            onChange={this.handleChange}
          /> 
          ))}
      </View>
    )
  }
}

export default MultipleChoice
