import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui'
import './index.scss'
import image from '../../assets/images/point.png'


@connect(({ edit, home, common }) => ({
  ...edit,
  ...home,
  ...common
}))

class instructions extends Component {
  config = {
    navigationBarTitleText: '准报新手入门引导',
  };
  constructor(props) {
    super(props)
    this.state = {}
    this.toCreate = this.toCreate.bind(this)
    this.creatCourse = this.creatCourse.bind(this)
    this.joinCourse = this.joinCourse.bind(this)
  }
  toCreate() {
    if(this.props.token) {
      Taro.navigateTo({
        url: `/pages/edit/index?isInit=0&reportId=`
      })
    } else {
      this.props.dispatch({
        type: 'home/save',
        payload: {
          isPersonal: 3
        }
      })
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
                  payload: {
                    wxInfo: res.userInfo
                  }
                })
                encryptedData = res.encryptedData
                iv = res.iv
              }
            }).then(() => {
              let params = { encryptedData: encryptedData, iv: iv, code: code, oid: 'gh_13a2c24667b4' }
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
  }
  creatCourse() {
    Taro.navigateTo({
      url: `./creatProject`
    })
  }
  joinCourse() {
    Taro.navigateTo({
      url: `./joinProject`
    })
  }

  render() {
    return (
      <View className='instructions'>
        <View className="part">
          <View className="title"> 准报是什么？</View>
          <View className="explain">「准报」是一款应用于微信平台中，可以高效进行信息传达与数据采集的工具，它的应用场景涵盖了调查投票、信息登记、打卡汇报、消息通知等，可广泛用于学校、企业的信息采集管理工作。</View>
        </View>
        <View className="part">
          <View className="title"> 准报怎么用？</View>
          <View className="explain">准报的用户角色分为2类：填报创建人员、填报作答人员</View>
          <View className="explain">
            <View><View className="bold">1.填报创建人员</View>，可使用准报小程序创建一个填报项目，并分享给微信好友参与，创建项目需要完成下面一系列操作步骤：</View>
            <View>1）登录后，新建一个填报项目</View>
            <View>2）编辑填报内容、设置填报限制</View>
            <View>3）发布分享给微信好友</View>
          </View>
          <View className="explain">另外，创建人员在项目收集过程中，可以实时查看填报回收进度、填报作答结果、督促他人填报。</View>
        </View>
        <View className="point">
          <Image src={image} />
          戳
          <Text onClick={this.creatCourse}>准报使用帮助-我要创建填报项目</Text>
        </View>
        <View className="part">
          <View className="explain">
            <View><View className="bold">2.填报参与人员</View>，可在微信中随时随地查收并参与填报，也可在准报小程序中查收参与填报项目，具体操作步骤：</View>
            <View>操作一：微信聊天参与填报</View>
            <View>1）微信接收填报通知</View>
            <View>2）点击链接参与填报项目</View>
            <View>3）查看/修改填报答案</View>
          </View>
          <View className="explain">
            <View>操作二：准报小程序参与填报</View>
            <View>1）登录准报，打开“我参与”</View>
            <View>2）点击项目列表参与填报</View>
            <View>3）查看/修改填报答案</View>
          </View>
          <View className="explain">另外，参与人员也可以微信转发分享填报项目，或者自己创建填报呢。</View>
        </View>
        <View className="point">
          <Image src={image} />
          戳
          <Text onClick={this.joinCourse}>准报使用帮助-我要参与填写项目</Text>
        </View>
        <View className="btn">
          <AtButton type='primary' circle onClick={this.toCreate}>立即创建填报</AtButton>
        </View>
        <View className="foot">若有使用问题，请咨询客服 010-5751 0088-8018</View>
      </View>
    )
  }
}

export default instructions
