import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon,AtList,AtListItem }  from 'taro-ui'
import './index.scss'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux';
import {choiceOpt,openOpt} from '../../config'

@connect(({edit,home, common }) => ({
    ...edit,
    ...home,
    ...common
  }))
class NewQuestion extends Component {
  constructor(props) {
      super(props)
      this.state = {
        selector: ['单选', '多选', '填空文本','填空数字'],
        selectorChecked: '单选',
      }
      this.onChange = this.onChange.bind(this)
      this.addQuestion = this.addQuestion.bind(this)
  }

  addQuestion(value){
    const {isChange} = this.props
    let questionnaire = this.props.questionnaire
    const index = questionnaire.pageList[0].qtList.length
    let optlist = []
    if(value == 0 || value == 1){
      optlist = choiceOpt
    }else{
      optlist = openOpt
    }
    const fixSeq = questionnaire.pageList[0].qtList[index-1].fixSeq.replace(/[^0-9]/ig,"")
    const qtList = [{
        "type": value == 0 || value == 1 ? 1 : 2,
        "selectType": value == 0 ? 0 :value == 1 ? 1 :value == 2 ? 1 :value == 3 ? 7 :'',
        "disSeq": `Q${index+1}`,
        "fixSeq": `Q${parseInt(fixSeq)+1}`,
        "mySeq": `Q${index+1}`,
        "cols": 1,
        "img": "",
        "smax": 4,
        "smin": 1,
        "optlist": optlist,
        "seq": "1",
        "required": true,
        "text": '',
    }]
    const newQtList = questionnaire.pageList[0].qtList.concat(qtList)
    questionnaire.pageList.map((item,key)=>{
         item.qtList = newQtList
    })
    
    this.props.dispatch({
        type: 'edit/save',
        payload: {
          questionnaire,
          isChange:!isChange
        }
      })
  }

  onChange (e) {
      const value = e.detail.value
      this.addQuestion(value)
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

 
  
  render() {
    const {opts} = this.props
    return (
      <View className='new-question'>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
          <View className='add-question'>
          <AtIcon value='add' size='30' color='#CCC'></AtIcon>
            <View className='add'>
                    新增题目
            </View>
          </View>
          </Picker>  
        </View>
    )
  }
}

export default NewQuestion
