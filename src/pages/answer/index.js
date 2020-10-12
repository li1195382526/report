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
    this.getNamelist = this.getNamelist.bind(this)
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
    const id = this.$router.params.listId
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({userAgent: JSON.stringify(res)})
      }
    })
    this.props.dispatch({
      type: 'answer/getQuestionner',
      token: this.props.token,
      url:`/v3/report/${id}`
    }).then(() => {
      if(!this.$router.params.from) {
        this.join()
      }
    })
  }

  // 获取名单
  getNamelist() {
    this.props.dispatch({
      type: 'answer/getNamelist',
      url:`/v3/report/${this.$router.params.listId}/namelist`
    })
  }

  //切换人员名单
   onChange (e)  {
    console.log(e.detail.value)
  }

  submit(){
    const {mobile, periodCount} = this.state
    const {res, anw, wxInfo} = this.props
    const id = this.$router.params.listId
    let params = {
      nickname: wxInfo.nickName,
      ctl: res.data.ctl,
      anw
    }
    this.props.dispatch({
      type: 'answer/subMitAnswer',
      token: this.props.token,
      url:`/v3/report/${id}/participant/${mobile}/submit`,
      payload: params
    })
    
  }

  //确认填报密码
  handlePassword(){
    const {passWord} = this.state
    var { info, res } = this.props
    if(!passWord) {
      Taro.showToast({
        title: '密码必须输入且不能为空格',
        icon: 'none',
        duration: 1500
      })
      return
    } else {
      this.setState({isPassWord:false})
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
    const {passWord, userAgent} = this.state
    const id = this.$router.params.listId
    var mobile = Taro.getStorageSync('mobile')
    let params = {
      mobile,
      pwd: passWord,
      listIndex: '',
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
      url:`/v3/report/${id}/join`,
      payload: params
    }).then(() => {
      Taro.hideLoading()
      let {res} = this.props
      if((res.status == 203 && res.message == '密码错误') || res.status == -1001) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        this.setState({isPassWord: true})
      } else if(res.status == -1003) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        this.getNamelist()
        this.setState({isHavename: true})
      } else if(res.status == 203) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
        setTimeout(() => {
          Taro.redirectTo({url: '../home/index'})
        }, (2000));
      }
    })
  }

  render() {
    const {isPassWord,isHavename, passWord} = this.state
    const {questionnaire,info, namelist} = this.props
    const from = this.$router.params.from
    const indexed = namelist.findIndex(item => item.status == 29)
    const index = namelist.findIndex(item => item.status == 0)
    return (
      <View className='answer'>
          <View className='change-name'>
            <View>小名</View>
            {!from && (
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
        {from != 'viewData' && (
          <View className='answer-footer'>
            <AtButton type='primary' onClick={this.submit}>提交填报</AtButton> 
          </View>
        )}
        
        {isHavename && (
          <AtModal isOpened={isHavename} closeOnClickOverlay={false}>
            <AtModalHeader>选择填答名单</AtModalHeader>
            <AtModalContent>
              <View className='answer-namelist'>
                <View className='tip'>请对号入座，选择正确的名单进行填报</View>
                <View className='content-name'>
                  {namelist.map((item, key) => (
                    item.status == 0 && (
                      <View className='name' onClick={this.join} key={key}>
                        <View className='name-key'>{key+1}</View>
                        <View className='name-text'>{item.name}</View>
                      </View>
                    )
                  ))}
                  {index == -1 && <View className='name-text'>暂无可选名单，请联系管理员</View>}
                </View>
                <View>
                  <View className='finish'>已填报</View>
                  <View className='finish-namelist'>
                    {namelist.map((i,key1) => (
                      i.status == 29 && (
                        <View className='finish-name' key={key1}>
                          <View className='finish-key'>{key1+1}</View>
                          <View className='name'>{item.name}</View>
                        </View>
                      )
                    ))}
                    {indexed == -1 && <View className='name'>暂无回答完成人员</View>}
                  </View>
                </View>
              </View>
            </AtModalContent>
          </AtModal>
        )}
        {isPassWord && (
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
        )}

      </View>
    )
  }
}

export default Answer;
