import Taro, { Component } from '@tarojs/taro';
import { View,Swiper,SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtMessage, AtButton,AtTabs, AtTabsPane,AtActionSheetItem,AtTabBar, AtModal } from 'taro-ui'
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
      currentPage:1,
      isOpened:false,
      isLogin:false,
      pageSize:10,
      status:null,
      ispartOpened:false,
      isDel: false,
    }
    this.handleWxLogin = this.handleWxLogin.bind(this)
    this.handleClickBar = this.handleClickBar.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleData = this.handleData.bind(this)
    this.toEdit = this.toEdit.bind(this)
    this.getOwnerlist = this.getOwnerlist.bind(this)
    this.getCycle = this.getCycle.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleColse = this.handleColse.bind(this)
    this.handlePart = this.handlePart.bind(this)
    this.confimDelete = this.confimDelete.bind(this)
    this.delCancel = this.delCancel.bind(this)
  }

  componentWillMount() {
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
  };

  componentDidShow = () => {
    this.getOwnerlist()
  }

  handleOpen (value,item){
      this.setState({
        isOpened:true,
        reportId:item.id,
        status:item.status
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
    const {currentPage, pageSize} = this.state
    const params = {
      current:currentPage,
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
      isOpened:false,
      ispartOpened:false
    })
  }

  handleData () {
       Taro.navigateTo({
       url: '/pages/viewData/index'
      })
  }

  toEdit (value) {
    const {isLogin,reportId} = this.state
    if(!!isLogin){
      Taro.navigateTo({
      url: `/pages/edit/index?isInit=${value}&reportId=${reportId}`
     })
    }else{
      this.handleWxLogin()
    }
    this.setState({
      isOpened:false,
      ispartOpened:false
    })
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
    // if(value === 1){
    //   Taro.navigateTo({
    //     url: '/pages/templateText/index'
    //    })
    // }
    // if(value === 2){
    //   Taro.navigateTo({
    //     url: '/pages/personalCenter/index'
    //    })
    // }
    this.setState({
      isOpened:false,
      ispartOpened:false
    })

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
              url: '/pages/templateText/index'
          })
          break;
      case 2:
          Taro.redirectTo({
              url: '/pages/personalCenter/index'
          })
          break;           
      default:
          break;
    }    
  }

  

  //复制填报
  handleCopy(){
    const {reportId} = this.state
    const params = {
      reportId
    }
    this.setState({
      isOpened:false
    })
    this.props.dispatch({
      type: 'home/copyReport',
      payload: params,
      token: this.props.token,
      url:`/v3/report/${reportId}/copy`
    }).then(
      ()=>{
        this.getOwnerlist()
      }
    )

  }

  //删除填报
  handleDelete(){
    const {reportId} = this.state
    const params = {
      reportId
    }
    this.props.dispatch({
      type: 'home/deleteReport',
      payload: params,
      token: this.props.token,
      url:`/v3/report/${reportId}`
    }).then(()=>{
      this.getOwnerlist()
    })
    this.delCancel()
  }

  //小程序分享
  onShareAppMessage(res) {
    console.log(res)
    if (res.from === 'button' || res.target.id == 1) {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:  '云调查',
      path: '/pages/answer/index?',
      imageUrl: 'https://www.epanel.cn/images/answer.jpg'
    }
  }

  handleShare(){
    //this.onShareAppMessage()
  }

  handleColse(){
    this.setState({
      isOpened:false,
      ispartOpened:false
    })
  }

  handlePart(val){
    this.setState({
      ispartOpened:true
    })
  }
  // 删除填报确认？
  confimDelete() {
    this.setState({isDel: true, isOpened:false})
  }
  // 删除填报取消
  delCancel() {
    this.setState({isDel: false})
  }

  render() {
    const {createList } = this.props
    const tabList = [{ title: '我的创建' }, { title: '我的参与' }]
    const {isLogin,status, isDel, current} = this.state
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
            {!!isLogin ? <List handleOpen={this.handleOpen} createList={createList}/> : 
            // eslint-disable-next-line react/jsx-no-undef
            <Image src={image} className='list-img' />}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <Participate handlePart={this.handlePart} />
          </AtTabsPane>
        </AtTabs>
        
        <View className='create-fill' onClick={()=>this.toEdit(0)}>
          <AtButton type='primary' openType='getUserInfo'>{isLogin?"创建填报":"立即登录"}</AtButton>
        </View>
        
         {/* 列表选择项 */}
         <AtActionSheet isOpened={this.state.isOpened}>
           {status === 0 && (
             <AtActionSheetItem onClick={()=>this.toEdit(1)}>
                编辑填报
            </AtActionSheetItem>
           )}
           {(status === 5 || status === 2) && (
             
             <AtActionSheetItem>
               <AtButton type='primary'  plain='true' openType='share' className='share-btn'>分享到微信群</AtButton>
            </AtActionSheetItem>
           ) }
            {(status === 2 || status === 5) && (
              <AtActionSheetItem onClick={this.handleData}>
             查看结果
            </AtActionSheetItem>
            )}
            
            {status === 2 && (
             <AtActionSheetItem onClick={()=>this.toEdit(1)}>
                修改填报
            </AtActionSheetItem>
           )}
            <AtActionSheetItem onClick={this.handleCopy}>
                复制填报
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.confimDelete}>
                删除填报
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.handleColse}>
                取消
            </AtActionSheetItem>
          </AtActionSheet> 


          <AtActionSheet isOpened={this.state.ispartOpened}>
             <AtActionSheetItem onClick={()=>this.toEdit(1)}>
                修改填报
            </AtActionSheetItem> 
             <AtActionSheetItem>
               <AtButton type='primary'  plain='true' openType='share' className='share-btn'>分享填报</AtButton>
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.handleData}>
             查看答案
            </AtActionSheetItem>
            <AtActionSheetItem onClick={this.handleColse}>
                取消
            </AtActionSheetItem>
          </AtActionSheet> 
        </View>
        {isDel && (
          <AtModal
            isOpened={isDel}
            cancelText='取消'
            confirmText='删除'
            onClose={ this.delCancel }
            onCancel={ this.delCancel }
            onConfirm={ this.handleDelete }
            content={`确认删除<${createList[current].title}>填报?`}
          />
        )}
          {/* 底部bar */}
          <AtTabBar
            fixed
            tabList={[
              { title: '首页', iconType: 'home' },
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
