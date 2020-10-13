import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtIcon  }  from 'taro-ui'
import './style/multi.scss'
import { connect } from '@tarojs/redux';

@connect(({ edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class MultipleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
      }
      this.handleText = this.handleText.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleDeleteOpt = this.handleDeleteOpt.bind(this)
  }

  handleChange (value,item) {
    const {opts,isChange} = this.props
    if(value === ''){
      return
    }
    let newOptList = opts.optlist.filter((val)=> val.mySeq === item.mySeq ? val.label = value :val)
    let questionnaire = this.props.questionnaire
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

  handleText(value){
    const {opts,isChange} = this.props
    let questionnaire = this.props.questionnaire
    questionnaire.pageList[0].qtList.map((item,key)=>{
      if(item.disSeq === opts.disSeq){
         item.text = value
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
  

  //删除选项
  handleDeleteOpt(item,key){
    const {opts,isChange} = this.props
    let newOptList = opts.optlist.filter((val)=> val.mySeq !== item.mySeq)
    let questionnaire = this.props.questionnaire
    newOptList.map((val,key1)=>{
      val.mySeq = `A${key1+1}`
    })
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
    const {opts,isModify} = this.props
    return (
      <View className='multi-choice'>
        <View className='multi-width'>
          <AtInput
            name='value'
            title='题目标题'
            type='text'
            placeholder='请输入题目标题'
            value={opts.text}
            onChange={this.handleText}
          />
          {opts.optlist.map((item,key)=>(
            <View className='multi-opt'>
              <View className='multi-input'>
                <AtInput
                  border={false}
                  style={{width:'90%'}}
                  subtract
                  name='value'
                  title='选项'
                  type='text'
                  placeholder='选项'
                  value={item.label}
                  onChange={(val)=>this.handleChange(val,item)}
                />
              </View>
              {isModify && (
                 <View className='multi-icon' onClick={(val)=>this.handleDeleteOpt(item,key)}>
                  <AtIcon value='subtract-circle' size='20' color='red'></AtIcon>
                </View>
              )}
                 {!isModify && (
                 <View className='multi-icon'>
                  <AtIcon value='subtract-circle' size='20' color='gray'></AtIcon>
                </View>
              )}
            </View>
          ))}
        </View>
         
      </View>
    )
  }
}

export default MultipleChoice
