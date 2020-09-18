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
    const token = this.props.token || Taro.getStorageSync('token');
    if (!token) {
      this.setState({
        isLogin:false
      })
    }else{
      this.getOwnerlist()
      this.getCycle()
      this.setState({
        isLogin:true
      })
    }
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

  //获取创建填报的列表
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
    const {isLogin} = this.state
    if(!!isLogin){
      Taro.navigateTo({
      url: '/pages/edit/index'
     })
    }else{
      this.handleWxLogin()
    }
    
  }

  //微信登录
  handleWxLogin() {
    let encryptedData = ''
    let iv = ''
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
              encryptedData = res.encryptedData
              iv = res.iv    
            }
          }).then(()=>{
            let params = { encryptedData: encryptedData, iv: iv, code: code, userId: '0',oid:'gh_13a2c24667b4' }
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
            {!!isLogin ? <List handleOpen={this.handleOpen} /> : 
            <Image src={image} className='list-img' />}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <Participate />
          </AtTabsPane>
        </AtTabs>
        
        <View className='create-fill' onClick={this.toEdit}>
          <AtButton type='primary' circle openType='getUserInfo'>{isLogin?"创建填报":"立即登录"}</AtButton>
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
            <AtActionSheetItem>
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
      </View>
    )
  }
}

export default Home;
