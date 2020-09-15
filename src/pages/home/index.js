import Taro, { Component } from '@tarojs/taro';
import { View,Swiper,SwiperItem  } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtMessage, AtButton,AtTabs, AtTabsPane,AtActionSheetItem,AtTabBar } from 'taro-ui'
import Questionaires from '../../components/questionaire'
import './index.scss';
import List from '../../components/list';
import Participate from '../participates'
import image from '../../assets/images/u128.png'

@connect(({ home, common }) => ({
  ...home,
  ...common
}))


class Home extends Component {
  config = {
    navigationBarTitleText: '准报',
  };

  constructor(props) {
    super(props)
    this.state = {
      currentBar:0,
      current: 0,
      isOpened:false,
      data:[],
      isLogin:false,
      pageSize:10,
      reportId:'1234256' 
    }
    this.handleWxLogin = this.handleWxLogin.bind(this)
    this.handleClickBar = this.handleClickBar.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleData = this.handleData.bind(this)
    this.toEdit = this.toEdit.bind(this)
    this.getOwnerlist = this.getOwnerlist.bind(this)
    this.getCycle = this.getCycle.bind(this)
  }

  componentWillMount() {
    const token = this.props.token || Taro.getStorageSync('token');
    if (!token) {
      Taro.redirectTo({
        url: '../login/index'
      })
    }else{
      this.setState({
        isLogin:true
      })
    }
  };

  componentDidMount(){
    this.getOwnerlist()
    this.getCycle()
  }

  handleOpen (){
      this.setState({
        isOpened:true
      })
  }

  //获取周期
  getCycle(){
    const {reportId} = this.state
    this.props.dispatch({
      type: 'home/getCycle',
      token: this.props.token,
      url:`/v3/report/${reportId}/periods`
    })
  }

  getOwnerlist(){
    const {current, pageSize} = this.state
    const params = {
      current,
      pageSize
    }
    this.props.dispatch({
      type: 'home/getOwnerlist',
      payload: params,
      token: this.props.token,
    })
  }

   // 小程序上拉加载
   onReachBottom() {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.getOwnerlist()
  }
  
  componentWillUnmount = ()=>{
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: 1,
        qtnList: []
      },
    });
  }

  componentDidShow = () => {

  }

  handleLogout = () => {
    this.props.dispatch({
      type: 'home/logout',
    })
  }

  handleClick (value) {
    this.setState({
      current: value,
      isOpened:false
    })
  }

  handleData () {
       Taro.navigateTo({
       url: '/pages/viewData/index'
      })
  }

  toEdit () {
    Taro.navigateTo({
      url: '/pages/edit/index'
     })
  }

  handleClickBar(value){
    if(value === 1){
      Taro.navigateTo({
        url: '/pages/templateText/index'
       })
    }
    if(value === 2){
      Taro.navigateTo({
        url: '/pages/personalCenter/index'
       })
    }
    this.setState({
      isOpened:false
    })
  }

  submit = () =>{
    Taro.navigateTo({
      url: '/pages/answer/index'
     })
  }

  handleWxLogin(){
    let encryptedData = ''
    let iv = ''
    Taro.login()
      .then(r => {
        var code = r.code // 登录凭证
        if (code) {
          // 调用获取用户信息接口
          Taro.getUserInfo({
            success: function (res) {
              encryptedData = res.encryptedData
              iv = res.iv    
            }
          }).then(()=>{
            let params = { encryptedData: encryptedData, iv: iv, code: code }
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


  // handledingyue = () => {
  //   const _this = this
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['I-we9Wszvb7IAn-6IR3GqYbdUBxp3nUqrLLhCwKwOm0'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
  //     success (res) {
  //       console.log('已授权接收订阅消息')
  //       _this.sendMessage()
  //     }
  //   })
  // }

  // sendMessage =() => {
  //     var self = this;
  //     console.log(this)
  //     var _access_token = this.props.token
  //     var opeid = this.props.openid
  //     let url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + _access_token
     
  //     let jsonData = {
  //       access_token: _access_token,
  //       touser: opeid,
  //       template_id: 'I-we9Wszvb7IAn-6IR3GqYbdUBxp3nUqrLLhCwKwOm0',
  //       page: "pages/home/index",
  //       data: {
  //         "thing7": { "value": "互联网大会科学技术", "color": "#173177" },
  //         "thing4": { "value": "双人海鲜自助餐", "color": "#173177" },
  //         "thing3": { "value": "2019年11月1日", "color": "#173177" },
  //         "thing2": { "value": "全场通用", "color": "#173177" },
  //         "thing8": { "value": "请在有效期内使用", "color": "#173177" },
  //       },
  //       miniprogram_state: 'developer',
  //     }
  //     wx.request({
  //       url: url,
  //       data:jsonData,
  //       method: 'POST',
  //       success (res) {
  //         console.log("***" + JSON.stringify(res))
  //         if (res.data.errcode === 0) {
  //           wx.showToast({
  //             title: '通知成功',
  //           })
  //         }
  //       },
  //       fail (err) {
  //         console.log('request fail ', err);
  //       },
  //     })
    
  // }

  render() {
    const { qtnList, qtnTypes, projectExist } = this.props
    const tabList = [{ title: '我的创建' }, { title: '我的参与' }]

    const qtProps = {
      qtnTypes,
      view: false,
      onChangeStatus: this.handleChangeStatus
    }
    //leftText='+新建问卷'
    const {currentBar, isLogin, data} = this.state
    return (
      <View className='page'>
        {/* 首页跑马灯及创建填报列表 */}
           <View>
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
              <View className='demo-text-1'>1</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-2'>2</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-3'>3</View>
            </SwiperItem>
        </Swiper>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            <Image src={image} className='list-img' />
            <List handleOpen={this.handleOpen} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <Participate handleWxLogin={this.handleWxLogin}/>
          </AtTabsPane>
        </AtTabs>
        <View className='create-fill' onClick={this.toEdit}>
        <AtButton type='primary'>{isLogin ? "创建填报" :"立即登录"}</AtButton>
        </View>
         {/* 列表选择项 */}
         <AtActionSheet isOpened={this.state.isOpened}>
            <AtActionSheetItem onClick={this.toEdit}>
                编辑填报
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.submit}>
                分享到微信群
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.handleData}>
                查看结果
            </AtActionSheetItem>
            <AtActionSheetItem>
                复制填报
            </AtActionSheetItem>
            <AtActionSheetItem>
                删除填报
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.handleWxLogin}>
                取消
            </AtActionSheetItem>
          </AtActionSheet> 
        </View>
        
          {/* 底部bar */}
          <AtTabBar
            fixed
            tabList={[
              { title: '首页', iconType: 'bullet-list' },
              { title: '模板库', iconType: 'camera' },
              { title: '个人中心', iconType: 'folder' }
            ]}
            onClick={this.handleClickBar}
            current={this.state.currentBar}
          />
        {/* <View onClick={this.handledingyue} style={{marginBottom:'100px'}}>
          订阅
        </View> */}
      </View>
    )
  }
}

export default Home;
