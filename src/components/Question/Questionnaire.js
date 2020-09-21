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
        selector: ['单选', '多选', '填空文本'],
        selectorChecked: '单选',
      }
      this.onChange = this.onChange.bind(this)
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  onChange (e) {
    const value = e.detail.value
    //this.addQuestion(value)
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
}
  
  render() {
    const {data} = this.props
    return (
      <View>
        {data ? data.qtList.map((qt,key)=>(
            <View>
                <View className='change-qt'>
                  <View>{`题目${qt.disSeq}`}</View>
                  <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                   <View>{qt.type == 1 ? qt.selectType ===0 ? '单选':'多选' :'填空'}<AtIcon value='chevron-right' size='20' color='#ccc'></AtIcon></View> 
                  </Picker>
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
