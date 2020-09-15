import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'
import { QtSet } from '../../components/QtSet'

@connect(({ edit, home, common,question }) => ({
  ...edit,
  ...home,
  ...common,
  ...question
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
  }

  componentWillMount() {
   
  };

  componentDidMount(){
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
    console.log(this.props)
  }

  render() {
    return (
      <View className='edit'>
          <View>
             <View className='edit-title'>填报主题</View> 
             <View>
             <AtInput
               name='value' 
               type='text'
               placeholder='请输入填报主题名称'
               value={this.state.value}
               onChange={this.handleChange.bind(this)}
             />
             </View>
             <AtTextarea
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
                placeholder='请输入填报说明描述'
              />
          </View>
       <View>
           <View className='edit-title'>填报题目</View>
           <Question/>
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
