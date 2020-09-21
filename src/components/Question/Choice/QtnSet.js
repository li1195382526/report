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
  }

  //删除题目
  handleDelete(){
    const {opts,isChange} = this.props
   
    let questionnaire = this.props.questionnaire
    const newQtlist = questionnaire.pageList[0].qtList.filter((val)=> val.disSeq != opts.disSeq)
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
  
  render() {
    const {opts} = this.props
    return (
      <View className='qt-set'>
         <View><Checkbox value='选中' checked={opts.required}></Checkbox> 必答</View>
         <View onClick={this.handleDelete}><AtIcon value='trash' size='25' color='#ccc'></AtIcon></View>
      </View>
    )
  }
}

export default QtnSet
