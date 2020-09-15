import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtForm  }  from 'taro-ui'
import './style/question.scss'
import { connect } from '@tarojs/redux';

@connect(({ question,edit,home, common }) => ({
  ...question,
  ...edit,
  ...home,
  ...common
}))

class QuestionBottom extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    const {opts} = this.props
    const index = opts.optList.length
    //Object.assign(newObj,user,page)
    const opt = [{
      "fixSeq":`A${index+1 }`,
      "position":0,
      "val":1,
      "mySeq":`A${index+1 }`,
      "input":false,
      "fmt":"text",
      "seq":1,
      "img":"",
      "label":`选项${index+1}`,
      "conf":{},
      "required":false,
      "optQuote":false
    }]
    const newOptList = opts.optList.concat(opt)
    let questionnaire = this.props.questionnaire
    questionnaire.pageList[0].qtList.map((item,key)=>{
      if(item.disSeq === opts.disSeq){
         item.optList = newOptList
      } 
    })
    
    this.props.dispatch({
        type: 'question/save',
        payload: {
          questionnaire,
          id:index+1
        }
      })
  }
  
  render() {
    const {opts} = this.props
    console.log(this.props)
    return (
      <View className='opt-add' onClick={this.handleChange}>
         添加选项
      </View>
    )
  }
}

export default QuestionBottom
