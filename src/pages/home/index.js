import Taro, { Component } from '@tarojs/taro';
import { View,Swiper,SwiperItem  } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtMessage, AtButton,AtTabs, AtTabsPane,AtActionSheetItem,AtTabBar } from 'taro-ui'
import Questionaires from '../../components/questionaire'
import './index.scss';
import List from '../list';
import Participate from '../participates'
import TemplateText from '../../components/templateText'
import  PersonalCenter from  "../../components/personalCenter";

@connect(({ home, common }) => ({
  ...home,
  ...common
}))


class Home extends Component {
  config = {
    navigationBarTitleText: '问卷列表',
  };

  constructor(props) {
    super(props)
    this.state = {
      currentBar:0,
      current: 0,
      isOpened:false
    }
  }

  componentWillMount() {
    const token = this.props.token || Taro.getStorageSync('token');

    if (!token) {
      Taro.redirectTo({
        url: '../login/index'
      })
    }
  };

  componentWillUnmount() {

  }

  handleOpen (){
    console.log("----")
      this.setState({
        isOpened:true
      })
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

  handleData = () => {
       Taro.navigateTo({
       url: '/pages/viewData/index'
      })
  }

  toEdit = () => {
    Taro.navigateTo({
      url: '/pages/edit/index'
     })
  }

  handleClickBar(value){
    this.setState({
      currentBar: value,
      isOpened:false
    })
  }

  submit = () =>{
    Taro.navigateTo({
      url: '/pages/answer/index'
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
    const {currentBar} = this.state
    return (
      <View className='page'>
        {/* 首页跑马灯及创建填报列表 */}
        {currentBar === 0 && (
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
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <List handleOpen={this.handleOpen.bind(this)} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <Participate />
          </AtTabsPane>
        </AtTabs>
        <View className='create-fill' onClick={this.toEdit}>
          <AtButton type='primary'>创建填报</AtButton>
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
        )}
       {currentBar === 1 && (
         <TemplateText />
       )}
       {currentBar === 2 && (
         <PersonalCenter />
       )}
          {/* 底部bar */}
          <AtTabBar
            fixed
            tabList={[
              { title: '首页', iconType: 'bullet-list' },
              { title: '模板库', iconType: 'camera' },
              { title: '个人中心', iconType: 'folder' }
            ]}
            onClick={this.handleClickBar.bind(this)}
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
