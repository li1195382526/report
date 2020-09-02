import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux';
import * as utils from '../../utils/utils'
import './formlogin.scss';

@connect(({login}) => ({
  ...login,
}))

class FormLogin extends Component {
  config = {
    navigationBarTitleText: '云调查登录',
  };

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      rememberMe: true
    }
  }

  componentDidMount = () => {

  };

  handleInput (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }

  errorMessage = (msg) => {
    Taro.atMessage({
      'message': msg,
      'type': 'error'
    })
  }

  handleLogin = () => {
    const {username, password, rememberMe} = this.state
    let username2 = username.replace(/\s+/g, '')
    let password2 = password.replace(/\s+/g, '')

    const params = {username: username2, password: password2, rememberMe}

    if (username2) {
      if (utils.isPhone(username2) || utils.isMail(username2)) {
        if (password2) {
          if (utils.isPass(password2)) {

            this.props.dispatch({
              type: 'login/formLogin',
              payload: params
            })
            
          } else {
            this.errorMessage('请输入6-20位数字、字母、常用符号@,&,*,$,^,-,_或其组合')
          }
        } else {
          this.errorMessage('请输入密码')
        }
      } else {
        this.errorMessage('请输入正确的手机号/邮箱')
      }
    } else {
      this.errorMessage('手机/邮箱不能为空')
    }    
  }

  render() {
    return (
      <View className='page at-row at-row__justify--center'>
         <View className='panel at-col at-col-10'>
            <AtMessage />
            <View className='panel__title'>请输入您在云调查的帐户</View>
            <View className='panel__content no-padding'>
            <View className='example-item'>
              
                <AtInput
                  name='username'
                  title='账户'
                  type='text'
                  placeholder='请输入手机号/邮箱'
                  value={this.state.username}
                  onChange={this.handleInput.bind(this, 'username')}
                />
                <AtInput
                  name='password'
                  title='密码'
                  type='password'
                  placeholder='请输入密码'
                  value={this.state.password}
                  onChange={this.handleInput.bind(this, 'password')}
                />

                <View className='loginbutton'>
                  <AtButton type='primary' circle onClick={this.handleLogin}>立即登录</AtButton>
                </View>   
            </View>         
          </View>
        </View>
      </View>
    )
  }
}

export default FormLogin;
