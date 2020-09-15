import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'

class SingleChoice extends Component {
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
    return (
      <View className=''>
         
           <AtRadio
                options={[
                { label: '单选项一', value: 'option1' },
                { label: '单选项二', value: 'option2' },
                { label: '单选项三', value: 'option3' }
                ]}
                value={this.state.value}
                onClick={this.handleChange.bind(this)}
                />
      </View>
    )
  }
}

export default SingleChoice
