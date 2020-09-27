import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon }  from 'taro-ui'
import './style/question.scss'
import { connect } from '@tarojs/redux';

@connect(({ edit,home, common }) => ({
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
    const {opts,isChange} = this.props
    const index = opts.optlist.length
    let questionnaire = this.props.questionnaire
    console.log(opts)
    //Object.assign(newObj,user,page)
    const fixSeq = opts.optlist[opts.optlist.length-1].fixSeq.replace(/[^0-9]/ig,"")
    const opt = [{
      "fixSeq":`A${parseInt(fixSeq)+1 }`,
      "position":0,
      "val":1,
      "mySeq":`A${index+1 }`,
      "input":false,
      "fmt":"text",
      "seq":1,
      "img":"",
      "label":'',
      "conf":{},
      "required":true,
      "optQuote":false
    }]
    const newOptList = opts.optlist.concat(opt)
    questionnaire.pageList[0].qtList.map((item,key)=>{
      if(item.disSeq === opts.disSeq){
         item.optlist = newOptList
      } 
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
    const {opts} = this.props
    return (
      <View className='opt-add' onClick={this.handleChange}>
         <AtIcon value='add-circle' size='30' color='#71a0f7'></AtIcon>
         <View className='add'>添加选项</View>
      </View>
    )
  }
}

export default QuestionBottom
