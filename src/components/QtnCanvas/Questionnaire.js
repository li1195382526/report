import Taro, { Component } from '@tarojs/taro'
import { View,Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon }  from 'taro-ui'
import QuestionChoice from './QuestionChoice'
import QuestionOpen from './QuestionOpen'
import './index.scss'

class Questionnaire extends Component {
  constructor(props) {
      super(props)
      this.state = {
      
      }
      
  }
 
  render() {
    const {data} = this.props
    return (
      <View className='question'>
        {data ? data.qtList.map((qt,key)=>(
            <View className='question-qt' key={key}>
              <View className='all-title'>
                <View className='open-title'>
                  <View>
                    {qt.disSeq+'.'+qt.text}
                  </View>
                  <View>（必填）</View>
                </View>
              </View>
                {qt.type === 1 && <QuestionChoice  opts={qt}/>}
                {qt.type === 2 &&  <QuestionOpen opts={qt} />}
            </View>
        )):''}  
      </View>
    )
  }
}

export default Questionnaire
