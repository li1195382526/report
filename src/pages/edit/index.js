import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'
import { QtSet } from '../../components/QtSet'

@connect(({ edit, home, common }) => ({
  ...edit,
  ...home,
  ...common
}))

class Edit extends Component {
  config = {
    navigationBarTitleText: '编辑填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      title:'',
      memo:'',
      beginTime:'',
      endTime:'',
      id: "1",
      useCount: "0",
      pnlCount: "0",
      useNamelist: "1",
      namelist: [{
          "num": 1,
          "name":"张三",
          "status":1,
          "limit":["13901234567"]
        }],
      usePeriod: "1",
      periodType: "1",
      periodSize: "4",
      isStrict: "0",
      isUserLimit: "0",
      canEdit: "0",
      needPwd: "0",
      pwd: "",
      creatorName: "",
    }
    this.handleSave = this.handleSave.bind(this)
    this.getQuestionner = this.getQuestionner.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }

  componentWillMount() {
   
  };

  //获取问卷
  getQuestionner(){
    const {reportId} = this.state
    this.props.dispatch({
      type: 'edit/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${3}`
    })
  }

  componentDidMount(){
    //this.getQuestionner()
    this.setState({
      
    })
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleChange(){

  }

  handleRelease = () =>{
    Taro.navigateTo({
      url: '/pages/release/index'
     })
  }

  handleSave(){
    const {info,questionnaire} = this.props
    const params = {
      info,
      questionnaire
    }
    this.props.dispatch({
      type: 'edit/save',
      token: this.props.token,
      payload: params,
    })
  }

  handleTitle(value){
    let {info} = this.props
    info.title = value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info
      }
    })
  }

  handleMemo(value){
    let {info} = this.props
    info.memo = value
    this.props.dispatch({
      type: 'edit/save',
      payload: {
        info
      }
    })
  }

  render() {
    const {questionnaire,info} = this.props
    return (
      <View className='edit'>
          <View>
             <View className='edit-title'>填报主题</View> 
             <View>
             <AtInput
               name='value' 
               type='text'
               placeholder='请输入填报主题名称'
               value={info.title}
               onChange={this.handleTitle}
             />
             </View>
             <AtTextarea
                style={{borderTop:'none'}}
                value={info.memo}
                onChange={this.handleMemo.bind(this)}
                maxLength={200}
                placeholder='请输入填报说明描述'
              />
          </View>
       <View>
           <View className='edit-title'>填报题目</View>
           <Question questionnaire={questionnaire}/>
       </View>
        <View>
          <View className='edit-title'>填报设置</View>
          <QtSet />
        </View>
      <View className='edit-footer'>
        <View className='edit-save' onClick={this.handleSave}>
          保存
        </View>
        <View className='edit-send' onClick={this.handleRelease}>
          发布填报
        </View>
      </View>
      </View>
    )
  }
}

export default Edit;
