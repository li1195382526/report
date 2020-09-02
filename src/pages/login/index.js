import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';
import Logo from '../../assets/images/logo.png'
import './index.scss';

@connect(({login, common}) => ({
  ...login,
  ...common
}))

class Login extends Component {
  config = {
    navigationBarTitleText: '云调查',
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    const token = this.props.token || Taro.getStorageSync('token')
    const logintime = Taro.getStorageSync('logintime')
    let now =  new Date().valueOf()
    let duration = now - logintime
    
    if (!!token && duration < 1000*60*60) {
      Taro.redirectTo({ url: '/pages/home/index' })
      return
    }
  };
  
  handleForm = () => {
    Taro.navigateTo({
      url: '/pages/login/formlogin'
    })
  }
  
  handleWxLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/wxlogin'
    })
  }

  render() {
    return (
      <View className='page'>
        <View className='login'>
          <View class='copyright-info'>
            <Image src={Logo} style='width: 158px;height: 20px;'></Image>
            <View class='siteurl'>www.epanel.cn</View>
          </View>
          {process.env.TARO_ENV === 'weapp' && <View class='loginbutton'>
            <AtButton type='primary' circle onClick={this.handleWxLogin}>微信登录</AtButton>
          </View>}
          <View class='loginbutton'>
            <AtButton onClick={this.handleForm} circle>云调查登录</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default Login;
