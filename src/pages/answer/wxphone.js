import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux';
import './wxphone.scss';

@connect(({ login, answer }) => ({
  ...login,
  ...answer
}))

class WxLogin extends Component {
  config = {
    navigationBarTitleText: '云调查',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: '0',
      wx_code: ''
    }
  }

  componentWillMount() {
    this.getCode()
  };

  componentDidMount() {

  }

  errorMessage = (msg) => {
    Taro.atMessage({
      'message': msg,
      'type': 'error'
    })
  }

  getPhoneNumber = (e) => {
    if (e.detail.errMsg.split(':')[1] == 'ok') {
      let params = {
        userId: this.state.id,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        code: this.state.wx_code, oid: 'gh_13a2c24667b4'
      }
      //获取用户信息
      Taro.getUserInfo({
        success: function(res) {
          Taro.setStorage({
            key: "wxInfo",
            data: res.userInfo
          })    
          }
      })
      this.props.dispatch({
        type: 'answer/wxMobilelogin',
        payload: params
      }).then(() => {
        Taro.redirectTo({url: `./index?listId=${this.$router.params.listId}`})
      })
    } else {
      this.errorMessage('微信授权失败')
    }
  }

  getCode = () => {
    Taro.login()
      .then(r => {
        var code = r.code // 登录凭证
        if (code) {
          this.setState({ wx_code: code });
        } else {
          this.setState({ wx_code: '' });
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
            <AtButton type='primary' circle openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber}>授 权</AtButton>
          </View>
        </View>
      </View >
    )
  }
}

export default WxLogin;
