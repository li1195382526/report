import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import { AtGrid, AtListItem, AtAvatar, AtTabBar, AtButton } from "taro-ui"
import './index.scss'
import image from '../../assets/images/user.png'


@connect(({ edit, home, common }) => ({
  ...edit,
  ...home,
  ...common
}))

class PersonalCenter extends Component {
  config = {
    navigationBarTitleText: '个人中心',
  };
  constructor(props) {
    super(props)
    this.state = {
      currentBar: 3
    }
    this.handleWxLogin = this.handleWxLogin.bind(this)
    this.handelListDataBase = this.handelListDataBase.bind(this)
    this.login = this.login.bind(this)
    this.toInstructions = this.toInstructions.bind(this)
  }

  handelListDataBase(){
    // if(!!this.props.token){
      Taro.navigateTo({
            url: '/pages/dataList/index?from=personalCenter'
          })
    // }else{
    //   this.props.dispatch({
    //     type: 'home/save',
    //     payload: {
    //       isPersonal:2
    //     }
    //   })
    //   this.handleWxLogin()
    // } 
  }

  login(){
    this.props.dispatch({
      type: 'home/save',
      payload: {
        isPersonal:1
      }
    })
    this.handleWxLogin()
  }

  errorMessage = (msg) => {
    Taro.atMessage({
      'message': msg,
      'type': 'error'
    })
  }
  toInstructions() {
    Taro.navigateTo({ url: '/pages/instructions/index' })
  }

  handleWxLogin(){
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
          }).then(()=>{
            let params = { encryptedData: encryptedData, iv: iv, code: code,oid:'gh_13a2c24667b4' }
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

  render() {
    const {token,wxInfo} = this.props
    return (
      <View className='personal'>
        <View className='personal-login'>
          <View className='head-img'>
            <AtAvatar image={!!token ?wxInfo.avatarUrl : image} circle={true} size='300' ></AtAvatar>
          </View>
        <View className='wechat-name'>
            <View>
              {!!token ? wxInfo.nickName :'暂无'}
            </View>
            {!token && (
              <AtButton openType='getUserInfo' onClick={this.login}>立即登录</AtButton>
            )}
            
        </View>
            
        </View>
        <View>
        <AtListItem title='名单库' arrow='right' note='名单库用于发布填报时直接引用名单中人员' onClick={this.handelListDataBase} />
        {/* <AtListItem title='推荐小程序' arrow='right' />
        <AtListItem title='添加小程序' arrow='right' /> */}
          <AtListItem title='更新说明' arrow='right' onClick={() => Taro.navigateTo({ url: '/pages/updateInstructions/index'})}/>
        <AtListItem title='新手入门引导' arrow='right' onClick={this.toInstructions}/>
        </View>
        <AtTabBar
            fixed
            tabList={[
              { title: '首页', iconType: 'home' },
              { title: '我的项目', iconType: 'folder' },
              { title: '模板库', iconType: 'list' },
              { title: '个人中心', iconType: 'user' }
            ]}
            onClick={this.handleClickBar.bind(this)}
            current={this.state.currentBar}
          />
      </View>
    )
  }
}

export default PersonalCenter
