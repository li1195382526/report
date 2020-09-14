import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import { AtGrid,AtListItem,AtAvatar,AtTabBar } from "taro-ui"
import './index.scss'


@connect(({ PersonalCenter, home, common }) => ({
  ...PersonalCenter,
  ...home,
  ...common
}))

class PersonalCenter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentBar:2
    }
    this.handleWxLogin = this.handleWxLogin.bind(this)
  }

  handelListDataBase(){
      
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
              console.log(this.props)
              this.props.dispatch({
                type: 'personal/wxLogin',
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
    if(value === 0){
      Taro.navigateTo({
        url: '/pages/home/index'
       })
    }
    if(value === 1){
      Taro.navigateTo({
        url: '/pages/templateText/index'
       })
    }
  }

  render() {

    return (
      <View className='personal'>
        <View className='personal-login'>
          <View className='head-img'>
            <AtAvatar image='https://jdc.jd.com/img/200' circle={true} size='300' ></AtAvatar>
          </View>
        <View className='wechat-name'>
            <View>
                微信昵称
            </View>
            <View onClick={this.handleWxLogin}>
                立即登录
            </View>
        </View>
            
        </View>
        <View>
        <AtListItem title='发布名单库' arrow='right' note='名单库用于发布填报时直接引用名单中人员' onClick={this.handelListDataBase.bind(this)} />
        <AtListItem title='推荐小程序' arrow='right' />
        <AtListItem title='添加小程序' arrow='right' />
        <AtListItem title='更新说明' arrow='right' />
        </View>
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

export default PersonalCenter
