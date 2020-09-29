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
      reportId:35,
      periodCount:1,//周期数
      passWord:'',
      isPassWord:false,
      isHavename:false,
      userAgent: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleNum = this.handleNum.bind(this)
    this.join = this.join.bind(this)
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
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({userAgent: JSON.stringify(res)})
      }
    })
    //const {reportId} = this.$router.params
    this.props.dispatch({
      type: 'answer/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${35}`
    }).then(() => {
      let { info } = this.props
      if(info.needPwd == 1) {
        this.setState({isPassWord: true})
        return
      }
      if(info.useNamelist == 1) {
        this.setState({isHavename: true})
      }
    })
  }

  //切换人员名单
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

  //确认填报密码
  handlePassword(){
    const {passWord} = this.state
    let { info } = this.props
    if(!passWord) {
      Taro.showToast({
        title: '密码必须输入且不能为空格',
        icon: 'none',
        duration: 1500
      })
      return
    } else {
      this.setState({isPassWord:false})
      if(info.useNamelist == 1) {
        this.setState({isHavename: true})
        return
      }
      this.join()
    }
  }
  // 密码填写oninput
  handleNum(val){
    // eslint-disable-next-line react/no-unused-state
    this.setState({passWord:val.target.value.replace(/\s+/g,'')})
  }
  // 密码框取消
  cancelPwd() {
    Taro.showToast({
      title: '密码必须输入',
      icon: 'none',
      duration: 1500
    })
    return
  }
  // 进入填报
  join() {
    const {reportId, passWord, userAgent} = this.state
    var mobile = Taro.getStorageSync('mobile')
    let params = {
      mobile,
      password: passWord,
      nameListNum: 1,
      userAgent
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setState({isHavename: false})
    this.props.dispatch({
      type: 'answer/joinReport',
      token: this.props.token,
      url:`/v3/report/${reportId}/join`,
      payload: params
    }).then(() => {
      Taro.hideLoading()
      let {res} = this.props
      if(res.status == 203) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        // setTimeout(() => {
        //   Taro.redirectTo({url: '../home/index'})
        // }, (2000));
      } else if(res.status == -1001) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        this.setState({isPassWord: true})
      } else if(res.status == -1003) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        this.setState({isHavename: true})
      }
    })
  }

  render() {
    const {isPassWord,isHavename, passWord} = this.state
    // eslint-disable-next-line no-shadow
    const {questionnaire,info} = this.props
    return (
      <View className='answer'>
        <View className='change-name'>
          <View>小名</View>
          {info.canEdit == 1 && (
            <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View>切换名单</View>
            </Picker>
          )}
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
        
        
       <AtModal isOpened={isHavename} closeOnClickOverlay={false}>
        <AtModalHeader>选择填答名单</AtModalHeader>
        <AtModalContent>
            <View className='answer-namelist'>
              <View className='tip'>请对号入座，选择正确的名单进行填报</View>
              <View className='content-name'>
                <View className='name' onClick={this.join}>
                  <View className='name-key'>1</View>
                  <View className='name-text'>小名</View>
                </View>
                <View className='name'>
                  <View className='name-key'>1</View>
                  <View className='name-text'>小名</View>
                </View>
                <View className='name'>
                  <View className='name-key'>1</View>
                  <View className='name-text'>小名</View>
                </View>
                <View className='name'>
                  <View className='name-key'>1</View>
                  <View className='name-text'>小名</View>
                </View>
              </View>
            <View>
              <View className='finish'>已填报</View>
              <View className='finish-namelist'>
                <View className='finish-name'>
                  <View className='finish-key'>1</View>
                  <View className='name'>小小</View>
                </View>
                <View className='finish-name'>
                  <View className='finish-key'>1</View>
                  <View className='name'>小小</View>
                </View>
                <View className='finish-name'>
                  <View className='finish-key'>1</View>
                  <View className='name'>小小</View>
                </View>
              </View>
            </View>
            </View>
        </AtModalContent>
        
        </AtModal>
        <AtModal isOpened={isPassWord} closeOnClickOverlay={false}>
        <AtModalHeader>密码验证</AtModalHeader>
        <AtModalContent className='pass-content'>
            <Input type='text' 
              placeholder='请输入填报密码' 
              value={passWord}
              onInput={(val)=>this.handleNum(val)}
            />
        </AtModalContent>
        <AtModalAction> <Button onClick={this.cancelPwd}>取消</Button> <Button onClick={this.handlePassword}>确定</Button> </AtModalAction>
        </AtModal>

      </View>
    )
  }
}

export default Answer;
