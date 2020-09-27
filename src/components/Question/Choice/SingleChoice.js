import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtInput, AtIcon  }  from 'taro-ui'
import './style/multi.scss'
import { connect } from '@tarojs/redux';

@connect(({ edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class SingleChoice extends Component {
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
        console.log(item)
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
    console.log(key)
    const {opts,isChange} = this.props
    let newOptList = opts.optlist.filter((val)=> val.mySeq !== item.mySeq)
    newOptList.map((val,key1)=>{
      val.mySeq = `A${key1+1}`
    })
    let questionnaire = this.props.questionnaire
    questionnaire.pageList[0].qtList.map((qt,key)=>{
      if(qt.disSeq === opts.disSeq){
         qt.optlist = newOptList
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
                <View className='multi-icon' onClick={(val)=>this.handleDeleteOpt(item,key)}>
                  <AtIcon value='subtract' size='15' color='red'></AtIcon>
                </View> 
            </View>
          
          ))}
        </View> 
      </View>
    )
  }
}

export default SingleChoice
