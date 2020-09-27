import Taro, { Component } from '@tarojs/taro'
import { View,Checkbox } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtIcon  }  from 'taro-ui'
import './style/setting.scss'
import { connect } from '@tarojs/redux';

@connect(({edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class QtnSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
      }
      this.handleDelete = this.handleDelete.bind(this)
      this.handleRequired = this.handleRequired.bind(this)
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
  
  render() {
    const {opts} = this.props
    return (
      <View className='qt-set'>
         <View><Checkbox value='选中' checked={opts.required} onClick={()=>this.handleRequired(opts.required)}></Checkbox> 必填</View>
         <View onClick={this.handleDelete}><AtIcon value='trash' size='25' color='#ccc'></AtIcon></View>
      </View>
    )
  }
}

export default QtnSet
