import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'
import QuestionChoice from './QuestionChoice'
import QuestionOpen from './QuestionOpen'

class Questionnaire extends Component {
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
    const {data} = this.props
    return (
      <View className=''>
        {data ? data.qtList.map((qt,key)=>(
            <View>
                {qt.type === 1 && <QuestionChoice  opts={qt}/>}
                {qt.type === 2 &&  <QuestionOpen opts={qt}/>}
            </View>
        )):''}  
      </View>
    )
  }
}

export default Questionnaire
