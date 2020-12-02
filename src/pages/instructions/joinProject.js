import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss'
import image1 from '../../assets/images/join1.png'
import image2 from '../../assets/images/join2.png'
import image3 from '../../assets/images/join3.png'
import image4 from '../../assets/images/join4.png'
import image5 from '../../assets/images/join5.png'
import image6 from '../../assets/images/join6.png'

@connect(({ edit, home, common }) => ({
    ...edit,
    ...home,
    ...common
}))

class joinProject extends Component {
    config = {
        navigationBarTitleText: '准报新手入门-参与填写',
    };
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View className='create'>
                <View className="title">使用帮助--我要参与填报项目</View>
                <View className="steps">
                    <View className="step">1. 微信接收通知</View>
                    <View>您可以在微信消息中接收到填报项目参与链接，点击链接即可参与填报。</View>
                    <Image src={image1} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">2. 名单选择</View>
                    <View>创建者若设置填报名单，则您点击填报项目链接后，先选择填报的名单，然后针对该名单填报信息。</View>
                    <Image src={image2} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">3. 填写密码</View>
                    <View>若创建者设置填报密码，则您点击项目链接后，输入填报密码。</View>
                    <Image src={image3} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">4. 填写/提交填报</View>
                    <View>您填报完成后，点击“提交填报”即可完成填报。</View>
                    <Image src={image4} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">5. 查看我参与项目</View>
                    <View>您可以登录“准报”小程序，查看参与的填报项目。</View>
                    <Image src={image5} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">6. 查看结果</View>
                    <View>填报提交后，您可点击“查看结果”查看填报答案记录。</View>
                    <Image src={image6} mode="widthFix" style={{width:'100%'}}></Image>
                </View>
            </View>
        )
    }
}

export default joinProject
