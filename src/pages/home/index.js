import Taro, { Component } from '@tarojs/taro';
import { View,Swiper,SwiperItem  } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtMessage, AtButton,AtTabs, AtTabsPane,AtActionSheetItem,AtTabBar } from 'taro-ui'
import Questionaires from '../../components/questionaire'
import './index.scss';
import List from '../list';
import Participate from '../participates'
//import Template from '../../components/template'

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
      current: value
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
      currentBar: value
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
        <View className='create-fill'>
          <AtButton type='primary'>创建填报</AtButton>
        </View>
        </View>
        )}
       {/* {currentBar === 1 && (
         <Template />
       )} */}
        {/* 列表选择项 */}
        <AtActionSheet isOpened={this.state.isOpened}>
            <AtActionSheetItem onClick={this.toEdit}>
                编辑填报
            </AtActionSheetItem>
            <AtActionSheetItem>
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
      </View>
    )
  }
}

export default Home;
