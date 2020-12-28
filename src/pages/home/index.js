import Taro, { Component } from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtMessage, AtTabBar } from 'taro-ui'
import './index.scss';
import image1 from '../../assets/images/u190.png'
import image2 from '../../assets/images/u192.png'
import image3 from '../../assets/images/u195.png'
import image4 from '../../assets/images/u198.png'
import image5 from '../../assets/images/u201.png'
import image6 from '../../assets/images/u204.png'
import image7 from '../../assets/images/u147.png'
import image8 from '../../assets/images/u148.png'
import image9 from '../../assets/images/u149.jpg'

@connect(({ home, common, templateText }) => ({
  ...home,
  ...common,
  ...templateText
}))

class Home extends Component {
  config = {
    navigationBarTitleText: '准报',
  };
  constructor(props) {
    super(props)
    this.state = {
      currentBar: 0,
      isLogin: false,
    }
    this.handleWxLogin = this.handleWxLogin.bind(this)
    this.handleClickBar = this.handleClickBar.bind(this)
    this.toEdit = this.toEdit.bind(this)
    this.signUp = this.signUp.bind(this)
    this.showMore = this.showMore.bind(this)
    this.getList = this.getList.bind(this)
  }
  componentWillMount() {
    const token = Taro.getStorageSync('token');
    if (!token) {
      this.setState({
        isLogin: false
      })
    } else {
      this.setState({
        isLogin: true
      })
    }
  };
  componentDidShow = () => {
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'templateText/save',
      payload: {
        current: 1,
        templist: []
      },
    });
    this.getList()
  }
  componentWillUnmount = () => {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: 1,
        qtnList: [],
        createList: []
      },
    });
  }
  toEdit(id) {
    let { isLogin } = this.state
    // if (!!isLogin) {
      Taro.navigateTo({url: `/pages/edit/index?isInit=1&reportId=${id}&isTemplate=1`})
    // } else {
    //   this.handleWxLogin()
    // }
  }
  //微信登录
  handleWxLogin() {
    let encryptedData = ''
    let iv = ''
    const _this = this
    Taro.login()
      .then(r => {
        var code = r.code // 登录凭证
        if (code) {
          // 调用获取用户信息接口
          Taro.getUserInfo({
            success: function (res) {
              Taro.setStorage({
                key: "wxInfo",
                data: res.userInfo
              })
              _this.props.dispatch({
                type: 'common/save',
                payload: {
                  wxInfo: res.userInfo
                }
              })
              encryptedData = res.encryptedData
              iv = res.iv
            }
          }).then(() => {
            let params = { encryptedData: encryptedData, iv: iv, code: code, userId: '0', oid: 'gh_13a2c24667b4' }
            if (!!encryptedData && !!iv) {
              this.props.dispatch({
                type: 'home/wxLogin',
                payload: params
              })
            } else {
              this.errorMessage('微信获取用户信息失败')
            }
          })
        } else {
          this.errorMessage('微信授权登录失败')
        }
      })
  }
  handleClickBar(value) {
    this.setState({
      currentBar: value
    })
    switch (value) {
      case 0:
        Taro.redirectTo({
          url: '/pages/home/index'
        })
        break;
      case 1:
        Taro.redirectTo({
          url: '/pages/project/index'
        })
        break;
      case 2:
        Taro.redirectTo({
          url: '/pages/templateText/index'
        })
        break;
      case 3:
        Taro.redirectTo({
          url: '/pages/personalCenter/index'
        })
        break;
      default:
        break;
    }
  }
  signUp(type) {
    Taro.navigateTo({url: `/pages/edit/index?isInit=0&type=${type}&reportId=`})
  }
  showMore() {
    Taro.redirectTo({url: '/pages/templateText/index'})
  }
  getList() {
    const {userinfo} = this.props
    let params = {
      creatorId: userinfo.id,
      current: this.props.current,
      pageSize: this.props.pageSize
    }
    this.props.dispatch({
      type: 'templateText/getTemplist',
      payload: params,
      token: this.props.token,
    })
  }

  render() {
    const templist = this.props.templist.slice(0, 2)
    return (
      <View className='page'>
        <AtMessage />
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image src={image7} style='width: 100%; height: 100%' mode='aspectFull' onClick={() => Taro.redirectTo({url: '/pages/project/index'})}></Image>
          </SwiperItem>
          <SwiperItem>
            <Image src={image8} style='width: 100%; height: 100%' mode='aspectFull'></Image>
          </SwiperItem>
          <SwiperItem>
            <Image src={image9} style='width: 100%; height: 100%' mode='aspectFull' onClick={() => Taro.navigateTo({url: '/pages/instructions/index'})}></Image>
          </SwiperItem>
        </Swiper>
        <View className='info-card'>
          <View className='title'>应用场景</View>
          <View className='info-content'>
            <View className='item' onClick={() => this.signUp('register')}>
              <Image src={image1} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>报名登记</View>
            </View>
            <View className='item' onClick={() => this.signUp('vote')}>
              <Image src={image2} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>活动投票</View>
            </View>
            <View className='item' onClick={() => this.signUp('attendance')}>
              <Image src={image3} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>打卡签到</View>
            </View>
            <View className='item' onClick={() => this.signUp('notice')}>
              <Image src={image4} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>消息通知</View>
            </View>
            <View className='item' onClick={() => this.signUp('investigation')}>
              <Image src={image5} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>调查问卷</View>
            </View>
            <View className='item' onClick={() => this.signUp('new')}>
              <Image src={image6} mode='aspectFit' style={{ width: '100%' }}></Image>
              <View>自定义场景</View>
            </View>
          </View>
        </View>
        <View className='info-card' style={{ marginTop: '10px' }}>
          <View className='title'>
            <Text>热门推荐</Text>
            <Text className="more" onClick={this.showMore}>更多＞＞</Text>
          </View>
          <View className='info-content recommend'>
            {templist.map((item, index) => (
              <View className='list' onClick={() => this.toEdit(item.id)}>
                <View className='list-img'>
                  <Image src={item.imageUrl} className='data-img' mode='aspectFill' />
                </View>
                <View className='list-data'>
                  <View className='list-title'>{item.title}</View>
                  <View className='list-description'>{item.memo}</View>
                  <View className="list-num">
                    <View className='list-clock'>{item.templateLabel}</View>
                    <View className='list-eye'><AtIcon value='eye' size='25' color='#ccc'></AtIcon> {item.referenceNum}</View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* 底部bar */}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '我的项目', iconType: 'folder' },
            { title: '模板库', iconType: 'list' },
            { title: '个人中心', iconType: 'user' }
          ]}
          onClick={this.handleClickBar}
          current={this.state.currentBar}
        />
      </View>
    )
  }
}

export default Home;
