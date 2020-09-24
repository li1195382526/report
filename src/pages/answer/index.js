import Taro, { Component } from '@tarojs/taro';
import { View, Picker} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtButton } from 'taro-ui'
import './index.scss';
import {QtnCanvas} from '../../components/QtnCanvas'
import { info } from '../../config';

@connect(({ answer, home, common }) => ({
  ...answer,
  ...home,
  ...common
}))

class Answer extends Component {
  config = {
    navigationBarTitleText: '开始填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      selector: ['小名', '小花', '小亮', '甜甜'],
      selectorChecked: '小名',
      mobile:15526080904,
      reportId:20,
      periodCount:1//周期数
    }
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    this.setState({
    
    });
    this.getQuestionner = this.getQuestionner.bind(this)
  };

  componentDidMount(){
    this.getQuestionner()
  }

  //获取问卷
  getQuestionner(){
    //const {reportId} = this.$router.params
    this.props.dispatch({
      type: 'answer/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${20}`
    })
  }

   //周期类型
   onChange (e)  {
    console.log(e.detail.value)
  }

  submit(){
    const {mobile,reportId,periodCount} = this.state
    this.props.dispatch({
      type: 'answer/subMitAnswer',
      token: this.props.token,
      url:`/v3/participant/${mobile}/report/${reportId}/period/${periodCount}/submit`
    }).then(()=>{
      Taro.navigateTo({
      url: '/pages/submits/index'
     })
    })
    
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {questionnaire,info} = this.props
    console.log(questionnaire)
    return (
      <View className='answer'>
        <View className='change-name'>
          <View>小名</View>
          <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
              <View>切换名单</View>
          </Picker>
        </View>
        <View className='answer-title'>
          <View className='title'>{info.title}</View>
          <View className='memo'>{info.memo}</View>
        </View>
        <View className='answer-list'>
          <QtnCanvas questionnaire={questionnaire} />
        </View>
        <View className='answer-footer'>
          <AtButton type='primary' onClick={this.submit}>提交填报</AtButton> 
        </View>
        
        
       <AtModal isOpened={false}>
        <AtModalHeader>选择填答名单</AtModalHeader>
        <AtModalContent>
            <View>
                12321
            </View>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
        </AtModalContent>
        <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default Answer;
