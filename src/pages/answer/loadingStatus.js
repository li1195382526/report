import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtMessage, AtCard } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './loadingStatus.scss';

@connect(({ answer, home, common }) => ({
  ...answer,
  ...home,
  ...common
}))

class LoadingStatus extends Component {
  config = {
    navigationBarTitleText: '准报',
  };
  constructor(props) {
    super(props)
    this.state = {
      userAgent: '',
      id: ''
    }
    this.join = this.join.bind(this)
    this.getQuestionner = this.getQuestionner.bind(this)
    this.handelRes = this.handelRes.bind(this)
    this.handelCreate = this.handelCreate.bind(this)
    this.toHome = this.toHome.bind(this)
  }
  componentDidShow() {
    const scene = this.$router.params.scene
    const qrId = decodeURIComponent(scene)
    this.setState({
      id: qrId.split('=')[1]
    })
    this.getQuestionner()
    const from = this.$router.params.from
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        noModify: from === 'viewData' ? true : false
      }
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        "info": {},
        "questionnaire": {},
        "anw": {},
        "res": {}, // 进入填报的返回结果
        "namelist": [],
      }
    })
  }
  //获取问卷
  getQuestionner() {
    const id = this.$router.params.listId || this.state.id
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({ userAgent: JSON.stringify(res) })
      }
    })
    this.props.dispatch({
      type: 'answer/getQuestionner',
      token: this.props.token,
      url: `/v3/report/${id}`
    }).then(() => {
      this.join()
    })
  }
  // 进入填报
  join(item) {
    const { passWord, userAgent } = this.state
    const id = this.$router.params.listId || this.state.id
    const listIndex = item ? item.listIndex : ''
    var mobile = Taro.getStorageSync('mobile')
    const wxMobile = Taro.getStorageSync('wxMobile')
    let params = {
      mobile: !!mobile ? mobile.substring(0, 11) : wxMobile.substring(0, 11),
      pwd: passWord,
      listIndex,
      userAgent
    }
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setState({ isHavename: false })
    this.props.dispatch({
      type: 'answer/joinReport',
      token: this.props.token,
      url: `/v3/report/${id}/join`,
      payload: params
    }).then(() => {
      Taro.hideLoading()
      let { res } = this.props
      if (res.status == 200) {
        Taro.redirectTo({ url: `./index?listId=${this.$router.params.listId}` })
      } else if (res.status == -1002) {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        Taro.navigateTo({ url: `./wxphone?listId=${this.$router.params.listId || this.state.id}` })
      } else {
        Taro.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    })
  }
  handelRes() {
    const { info } = this.props
    const reportId = this.$router.params.listId || info.id
    const currentPeriod = info.periodSize
    Taro.navigateTo({
      url: `/pages/answerDetail/index?reportId=${reportId}&currentPeriod=${currentPeriod}&isStrict=${info.isStrict}`
    })
  }
  handelCreate() {
    Taro.navigateTo({
      url: `/pages/edit/index?isInit=0&reportId=`
    })
  }
  toHome() {
    Taro.redirectTo({
      url: `/pages/home/index`
    })
  }

  render() {
    const { info, res } = this.props
    return (
      <View className='content'>
        <AtMessage />
        {res.status && res.status != 200 && (
          <View>
            <View className="info">
              <View className='title'>
                <Text style={{ fontWeight: 'bold' }}>{info.title}</Text>
                <Text className="status">{info.status == 5 ? '已结束' : '已填报'}</Text>
              </View>
              <View className='memo'>{info.memo}</View>
              <View className="note">{`${info.creatorName} | ${info.updateTime || info.createTime} | 参与${info.finishCount}/${info.totalCount || '不限'}`}</View>
            </View>
            <View className='btn'>
              <AtButton type='primary' onClick={this.handelRes}>查看结果</AtButton>
              <AtButton className='create' type='secondary' onClick={this.handelCreate}>创建填报</AtButton>
            </View>
            <View className="to-home" onClick={this.toHome}>返回首页</View>
          </View>
        )}
      </View >
    )
  }
}

export default LoadingStatus;
