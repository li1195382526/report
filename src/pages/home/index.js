import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtMessage, AtButton, AtTabs, AtTabsPane, AtActionSheetItem, AtTabBar, AtModal } from 'taro-ui'
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
      currentBar: 0,
      current: 0,
      currentPage: 1,
      isOpened: false,
      isLogin: false,
      pageSize: 10,
      status: null,
      ispartOpened: false,
      isDel: false,
      opened: false,
      reportId: '',
      currentPeriod:'',
      itemdata: {},
      isStrict:null,
      reportName:'准报'
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
    this.handleShut = this.handleShut.bind(this)
    this.close = this.close.bind(this)
    this.partHandleData = this.partHandleData.bind(this)
    this.editAns = this.editAns.bind(this)
    this.toNextPeriod = this.toNextPeriod.bind(this)
  }

  componentWillMount() {
    const token = Taro.getStorageSync('token');
    if (!token) {
      this.setState({
        isLogin: false
      })
    } else {
      //获取周期
      //this.getCycle()
      this.setState({
        isLogin: true
      })
    }
  };

  componentDidShow = () => {
    if(this.state.current == 0) {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          createList: [],
          page: 1
        },
      })
      this.getOwnerlist()
    }
  }

  handleOpen(value, item) {
    this.setState({
      isOpened: true,
      reportId: item.id,
      status: item.status,
      itemdata: item,
      isStrict:item.isStrict,
      reportName:item.title
    })
  }

  //获取周期
  getCycle() {
    const { reportId } = this.state
    this.props.dispatch({
      type: 'home/getCycle',
      token: this.props.token,
      url: `/v3/report/${reportId}/periods`
    })
  }

  //获取创建填报的列表
  getOwnerlist() {
    const { pageSize } = this.state
    const {page} = this.props
    const params = {
      current: page,
      pageSize
    }
    if(!!this.props.token && !!Taro.getStorageSync('token')){
      this.props.dispatch({
        type: 'home/getOwnerlist',
        payload: params,
        token: this.props.token,
      })
    }
  }

  // 小程序上拉加载
  onReachBottom() {
    const { createList, createListTotal } = this.props
    const { isLogin } = this.state
    if(this.state.current == 0 && createList.length < createListTotal) {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          page: this.props.page + 1,
        },
      });
      this.getOwnerlist()
    } else if (isLogin) {
      Taro.showToast({
        title: '暂无更多数据',
        icon: 'none',
        duration: 2000
      })
    }
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

  handleClick(value) {
    this.setState({
      current: value,
      isOpened: false,
      ispartOpened: false
    })
  }

  handleData() {
    const {itemdata,isStrict,reportId,status} = this.state
    this.close()
    if(itemdata.finishCount == 0) {
      Taro.showToast({
        title: '暂无回收数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/viewData/index?reportId=${reportId}&status=${status}&usePeriod=${itemdata.usePeriod}&useCount=${itemdata.useCount}&useNamelist=${itemdata.useNamelist}&isStrict=${isStrict}`
    })
  }
  partHandleData() {
    this.close()
    const {itemdata,reportId,isStrict} = this.state
    const currentPeriod = itemdata.currentPeriod == 0 ? itemdata.totalPeriod : itemdata.currentPeriod
    Taro.navigateTo({
      url: `/pages/answerDetail/index?reportId=${reportId}&currentPeriod=${currentPeriod}&isStrict=${isStrict}`
    })
  }

  toEdit(value) {
    let { isLogin, reportId } = this.state
    if(value == 0) {
      reportId = ''
    }
    if (!!isLogin) {
      Taro.navigateTo({
        url: `/pages/edit/index?isInit=${value}&reportId=${reportId}`
      })
    } else {
      this.handleWxLogin()
    }
    this.setState({
      isOpened: false,
      ispartOpened: false
    })
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
                payload:{
                  wxInfo:res.userInfo
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
      isOpened: false,
      ispartOpened: false
    })
    this.setState({
      currentBar: value
    })
    ///pages/templateText/index 模板库页面
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
  handleCopy() {
    const { reportId } = this.state
    const params = {
      reportId
    }
    this.setState({
      isOpened: false
    })
    this.props.dispatch({
      type: 'home/copyReport',
      payload: params,
      token: this.props.token,
      url: `/v3/report/${reportId}/copy`
    }).then(() => {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          createList: [],
          page: 1
        },
      })
      this.getOwnerlist()
    })
  }

  //删除填报
  handleDelete() {
    const { reportId } = this.state
    this.props.dispatch({
      type: 'home/deleteReport',
      token: this.props.token,
      url: `/v3/report/${reportId}`
    }).then(() => {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          createList: [],
          page: 1
        },
      })
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
    const title = this.state.reportName.length > 11 ? this.state.reportName.substring(0,11)+'...'
    :this.state.reportName
    return {
      title: title,
      path: `/pages/answer/loadingStatus?listId=${this.state.reportId}`,
      imageUrl: 'https://www.epanel.cn/images/zhb-link.png'
    }
  }

  handleShare() {
    //this.onShareAppMessage()
  }

  handleColse() {
    //二维码页面
    // Taro.navigateTo({
    //   url: '/pages/code/index'
    // })
    this.setState({
      isOpened: false,
      ispartOpened: false
    })
  }
  close() {
    this.setState({
      isOpened: false,
      ispartOpened: false
    })
  }

  handlePart(val) {
    if(val.status == 0) {
      Taro.navigateTo({url: `../answer/index?listId=${this.state.reportId}`})
    } else {
      this.setState({
        ispartOpened: true,
        status: val.status,
        reportId: val.id,
        currentPeriod:val.currentPeriod,
        itemdata: val,
        isStrict:val.isStrict,
        reportName:val.title
      })
    }
  }
  // 继续填报
  toNextPeriod() {
    this.close()
    Taro.navigateTo({url: `../answer/index?listId=${this.state.reportId}`})
  }
  // 删除填报确认？
  confimDelete() {
    this.setState({ isDel: true, isOpened: false })
  }
  // 删除填报取消
  delCancel() {
    this.setState({ isDel: false })
  }
  // 关闭填报
  handleShut() {
    const { reportId } = this.state
    this.close()
    this.props.dispatch({
      type: 'home/closeReport',
      token: this.props.token,
      url: `/v3/report/${reportId}/close`
    }).then(() => {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          createList: [],
          page: 1
        },
      })
      this.getOwnerlist()
    })
  }
  // 修改填报
  editAns() {
    this.close()
    Taro.navigateTo({url: `../answer/index?from=home&listId=${this.state.reportId}&period=${this.state.currentPeriod}`})
  }

  render() {
    const { createList, Participantlist } = this.props
    const tabList = [{ title: '我的创建' }, { title: '我的参与' }]
    const { isLogin, status, isDel, current, opened, itemdata } = this.state
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
                <Image src='https://www.epanel.cn/images/zhunbao1.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
            <SwiperItem>
                <Image src='https://www.epanel.cn/images/zhunbao2.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
            <SwiperItem>
                <Image src='https://www.epanel.cn/images/zhunbao3.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
            <SwiperItem>
                <Image src='https://www.epanel.cn/images/zhunbao4.jpg' style='width: 100%; height: 100%'></Image>
            </SwiperItem>
          </Swiper>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick} className='home-tabs'>
            <AtTabsPane current={this.state.current} index={0} >
              {!!isLogin && createList.length ? <List handleOpen={this.handleOpen} createList={createList} /> :
                <View>
                  <Image src={image} className='list-img' />
                  <View className='no-data'>{!!isLogin ? '暂无数据' :'未登录暂无数据'}</View>
                </View>        
              }
            </AtTabsPane>
            
            <AtTabsPane current={this.state.current} index={1}>
              {!!isLogin ? <Participate ref={element => (this._Participate = element)} handlePart={this.handlePart} /> :
                <View>
                  <Image src={image} className='list-img' />
                  <View className='no-data'>未登录暂无数据</View>
                </View>
              }
            </AtTabsPane>
          </AtTabs>

          <View className='create-fill' onClick={() => this.toEdit(0)}>
            <AtButton type='primary' openType='getUserInfo'>{isLogin ? "创建填报" : "立即登录"}</AtButton>
          </View>

          {/* 列表选择项 */}
          {this.state.current == 0 && (
            <AtActionSheet isOpened={this.state.isOpened} onClose={this.close}>
              {status === 0 && (
                <AtActionSheetItem onClick={() => this.toEdit(1)}>
                  编辑填报
                </AtActionSheetItem>
              )}
              {(status === 5 || status === 2) && (
                <AtActionSheetItem onClick={this.handleColse}>
                  <AtButton type='primary' plain='true' openType='share' className='share-btn'>分享到微信群</AtButton>
                </AtActionSheetItem>
              )}
              {(status === 2 || status === 5) && (
                <AtActionSheetItem onClick={this.handleData}>
                  查看结果
                </AtActionSheetItem>
              )}
              {status === 2 && (
                <AtActionSheetItem onClick={() => this.toEdit(2)}>
                  修改填报
                </AtActionSheetItem>
              )}
              <AtActionSheetItem onClick={this.handleCopy}>
                复制填报
              </AtActionSheetItem>
              {(status === 0 || status === 5) && (
                <AtActionSheetItem onClick={this.confimDelete}>
                  删除填报
                </AtActionSheetItem>
              )}
              {status === 2 && (
                <AtActionSheetItem onClick={this.handleShut}>
                  关闭填报
                </AtActionSheetItem>
              )}
              <AtActionSheetItem onClick={this.close}>
                取消
              </AtActionSheetItem>
            </AtActionSheet>
          )}
          {this.state.current == 1 && (
            <AtActionSheet isOpened={this.state.ispartOpened} onClose={this.close}>
              {status == 1 && (
                <AtActionSheetItem>
                  <AtButton type='primary' plain='true' openType='share' className='share-btn'>分享填报</AtButton>
                </AtActionSheetItem>
              )}
              {status == 1 && itemdata.canEdit == 1 && <AtActionSheetItem onClick={this.editAns}>修改填报</AtActionSheetItem>}
              <AtActionSheetItem onClick={this.partHandleData}>
                {status == 1 ? '查看答案' : '查看结果'}
              </AtActionSheetItem>
              {itemdata.currentPeriod < itemdata.totalPeriod && itemdata.isStrict == 0 && (<AtActionSheetItem onClick={this.toNextPeriod}>继续填报</AtActionSheetItem>)}
              <AtActionSheetItem onClick={this.close}>取消</AtActionSheetItem>
            </AtActionSheet>
          )}
        </View>

        {isDel && (
          <AtModal
            isOpened={isDel}
            cancelText='取消'
            confirmText='删除'
            onClose={this.delCancel}
            onCancel={this.delCancel}
            onConfirm={this.handleDelete}
            content={`确认删除<${itemdata.title}>填报?`}
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
