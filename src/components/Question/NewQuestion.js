import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon,AtList,AtListItem }  from 'taro-ui'
import './index.scss'
// eslint-disable-next-line import/first
import { connect } from '@tarojs/redux';

@connect(({edit,home, common }) => ({
    ...edit,
    ...home,
    ...common
  }))
class NewQuestion extends Component {
  constructor(props) {
      super(props)
      this.state = {
        selector: ['单选', '多选', '填空文本'],
        selectorChecked: '单选',
      }
      this.onChange = this.onChange.bind(this)
      this.addQuestion = this.addQuestion.bind(this)
  }

  addQuestion(value){
    const {isChange} = this.props
    let questionnaire = this.props.questionnaire
    const index = questionnaire.pageList[0].qtList.length
    const qtList = [{
        "type": value == 0 || value == 1 ? 1 : 2,
        "selectType": value == 0 ? 0 :value == 1 ? 1 :value == 2 ? 1 :'',
        "disSeq": `Q${index+1}`,
        "fixSeq": `Q${index+1}`,
        "mySeq": `Q${index+1}`,
        "cols": 1,
        "img": "",
        "smax": 4,
        "smin": 1,
        "optlist": [{
          "fixSeq":"A1",
          "position":0,
          "val":1,
          "mySeq":"A1",
          "input":false,
          "fmt":"text",
          "seq":1,
          "img":"",
          "label":"",
          "conf":{},
          "required":true,
          "optQuote":false
        }
      ],
        "seq": "1",
        "text": value == 0 || value == 1 ? "选择题" : "填空题",
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