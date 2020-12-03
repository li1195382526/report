import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss'

@connect(({ edit, home, common }) => ({
    ...edit,
    ...home,
    ...common
}))

class creatProject extends Component {
    config = {
        navigationBarTitleText: '准报新手入门-创建填报',
    };
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View className='create'>
                <View className="title">使用帮助--我要创建填报项目</View>
                <View className="steps">
                    <View className="step">1. 创建填报项目</View>
                    <View>登录准报小程序后，点击“创建填报”新建一个填报项目。</View>
                    <Image src='http://www.epanel.cn/images/create1.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">2. 编辑填报</View>
                    <View>编辑“填报主题”、“填报说明”，然后添加填报的题目，支持单选、多选、填空等多种题型。</View>
                    <Image src='http://www.epanel.cn/images/create2.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">3. 设置填报规则</View>
                    <View>设置“填报时间”、填报人数，用于限制填报开始时间和结束时间，以及填报项目回收的人数。</View>
                    <Image src='http://www.epanel.cn/images/create3.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">4. 发布填报</View>
                    <View>完成填报编辑后，点击“发布填报”，发布填报后只能修改文字内容，题目、设置不支持修改。</View>
                    <Image src='http://www.epanel.cn/images/create4.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">5. 分享填报</View>
                    <View>发布成功后，可将填报分享至微信好友，或者生成填报二维码，分享二维码至微信群。</View>
                    <Image src='http://www.epanel.cn/images/create5.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
                <View className="steps">
                    <View className="step">6. 查看结果</View>
                    <View>登录准报小程序，点击项目列表，您可以实时查看回收结果。</View>
                    <Image src='http://www.epanel.cn/images/create6.png' mode="widthFix" style={{width:'100%'}}></Image>
                </View>
            </View>
        )
    }
}

export default creatProject
