import Taro, { Component } from '@tarojs/taro'
import { View,Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon }  from 'taro-ui'
import QuestionChoice from './QuestionChoice'
import QuestionOpen from './QuestionOpen'
import './index.scss'
import { connect } from '@tarojs/redux';
import {choiceOpt,openOpt} from '../../config'

@connect(({edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class Questionnaire extends Component {
  constructor(props) {
      super(props)
      this.state = {
        selector: ['单选', '多选', '填空文本','填空数字'],
        selectorChecked: '单选',
      }
      this.onChange = this.onChange.bind(this)
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  //切换题目
  onChange (e,qt,index) {
    const value = e.detail.value
    const {isChange} = this.props
    let questionnaire = this.props.questionnaire
    let optlist = []
    if(value == 0 || value == 1){
      optlist = choiceOpt
    }else{
      optlist = openOpt
    }
    const qtList = {
      "type": value == 0 || value == 1 ? 1 : 2,
      "selectType": value == 0 ? 0 :value == 1 ? 1 :value == 2 ? 1 :value == 3 ? 7 :'',
      "disSeq": qt.disSeq,
      "fixSeq": qt.fixSeq,
      "mySeq": qt.mySeq,
      "cols": 1,
      "img": "",
      "smax": 4,
      "smin": 1,
      "optlist": optlist,
      "seq": "1",
      "required": true,
      "text": value == 0 || value == 1 ? "选择题" : "填空题",
  }
    questionnaire.pageList.map((item,key)=>{
      // eslint-disable-next-line no-shadow 
      item.qtList[index] = qtList
    })
    this.props.dispatch({
        type: 'edit/save',
        payload: {
          questionnaire,
          isChange:!isChange
        }
      })
}
  
  render() {
    const {data} = this.props
    return (
      <View>
        {data ? data.qtList.map((qt,key)=>(
            <View className='change'>
                <View className='change-qt'>
                  <View>{`题目${qt.disSeq}`}</View>
                  <Picker mode='selector' range={this.state.selector} onChange={(val)=>this.onChange(val,qt,key)}>
                   <View>{qt.type == 1 ? qt.selectType ===0 ? '单选':'多选' : qt.selectType ===1  ? '填空文本': '填空数字'}<AtIcon value='chevron-right' size='20' color='#ccc'></AtIcon></View> 
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
