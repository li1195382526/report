import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './wxlogin.scss';

@connect(({ login }) => ({
  ...login,
}))

class WxLogin extends Component {
  config = {
    navigationBarTitleText: '云调查',
  };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {

  }

  errorMessage = (msg) => {
    Taro.atMessage({
      'message': msg,
      'type': 'error'
    })
  }

  handleWxLogin = () => {
    let encryptedData = ''
    let iv = ''

    Taro.login()
      .then(r => {
        var code = r.code //登录凭证

        if (code) {
          //2 调用获取用户信息接口
          
          Taro.getUserInfo({
            success: function (res) {
              encryptedData = res.encryptedData
              iv = res.iv    
            }
          }).then(()=>{
            let params = { encryptedData: encryptedData, iv: iv, code: code }

            if (!!encryptedData && !!iv) {
              this.props.dispatch({
                type: 'login/wxLogin',
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

  render() {

    return (
      <View className='wxlogin-page'>
        <AtMessage />
        <View className='login'>

          <View class='alert'>
            <View class='alert-title'>尊敬的用户，请确认授权以下信息</View>
            <View class='alert-desc'>
              <View class='alert-text'>获得你的公开信息（昵称、头像等）</View>
            </View>
            <AtButton type='primary' circle openType='getUserInfo' onGetUserInfo={this.handleWxLogin} >确认登录</AtButton>
          </View>

        </View>

        {/* <View class='logged'>
          <Image class='logged-icon' src='../../images/iconfont-weixin.png' />
          <View class='logged-text'>近期你已经授权登陆过</View>
          <View class='logged-text'>自动登录中</View>
        </View> */}
      </View >
    )
  }
}

export default WxLogin;
