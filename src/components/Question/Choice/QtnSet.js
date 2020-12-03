import Taro, { Component } from '@tarojs/taro'
import { View,Checkbox } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction }  from 'taro-ui'
import './style/setting.scss'
import { connect } from '@tarojs/redux';
import { fromJS } from 'immutable';

@connect(({edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class QtnSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
        qtnset_isopen: false
      }
      this.handleDelete = this.handleDelete.bind(this)
      this.handleRequired = this.handleRequired.bind(this)
      this.cancel = this.cancel.bind(this)
      this.handeCopy = this.handeCopy.bind(this)
  }

  //删除题目
  handleDelete(){
    const {opts,isChange} = this.props
   
    let questionnaire = this.props.questionnaire
    let newQtlist = questionnaire.pageList[0].qtList.filter((val)=> val.disSeq != opts.disSeq)
    console.log(newQtlist)
    newQtlist.map((item,key)=>{
      item.disSeq = `Q${key+1}`
      item.mySeq = `Q${key+1}`
    })
    questionnaire.pageList.map((item)=>{
         item.qtList = newQtlist
    })
    this.props.dispatch({
        type: 'edit/save',
        payload: {
          questionnaire,
          isChange:!isChange
        }
      })
      this.cancel()
  }
  cancel() {
    this.setState({qtnset_isopen: false})
  }

  //必答设置
  handleRequired(required){
    const {questionnaire,opts,isChange} = this.props
    questionnaire.pageList[0].qtList.map((val)=>{
      if(val.disSeq === opts.disSeq){
        val.required = !required
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

  //复制题目
  handeCopy(){
    const {opts,questionnaire,isChange} = this.props 
    let newQt = [] 
    let isTrue = true
    questionnaire.pageList[0]
      .qtList.map((qt,key)=>{
        if(qt.disSeq == opts.disSeq && isTrue ){
          isTrue = false
          questionnaire.pageList[0].qtList.splice(key+1,0,qt)
          return
        }
      })
      questionnaire.pageList[0]
      .qtList.map((val,key)=>{
        newQt.push(JSON.parse(JSON.stringify(val)))
      })
      newQt.map((val,key)=>{
        val.disSeq = `Q${key+1}`
      })
      questionnaire.pageList[0].qtList = newQt
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
    const {qtnset_isopen} = this.state
    return (
      <View className="qtset-con">
        <View className='qt-set'>
          <View><Checkbox value='选中' checked={opts.required} disabled={!isModify} onClick={() => this.handleRequired(opts.required)}></Checkbox> 必填</View>
          {isModify && (
            <View>
              <AtIcon onClick={() => this.setState({qtnset_isopen: true})} value='trash' size='25' color='#ccc'></AtIcon>
              <AtIcon onClick={this.handeCopy} value='money' size='25' color='#ccc'></AtIcon>
              </View>
          )}
          {!isModify && (
            <View><AtIcon value='trash' size='25' color='#ccc'></AtIcon></View>
          )}
        </View>
        {qtnset_isopen && (
          <AtModal isOpened={qtnset_isopen} closeOnClickOverlay={false}>
            <AtModalHeader>提示</AtModalHeader>
            <AtModalContent>
              确认删除该项题目吗？
            </AtModalContent>
            <AtModalAction> <Button onClick={this.cancel}>取消</Button> <Button onClick={this.handleDelete}>确定</Button> </AtModalAction>
          </AtModal>
        )}
      </View>
    )
  }
}

export default QtnSet
