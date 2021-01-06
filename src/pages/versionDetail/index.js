import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui'
import './index.scss'
import { v100, v110 } from './versionConfig'

@connect(({ home, common }) => ({
    ...home,
    ...common
}))

class VersionDetail extends Component {
    config = {
        navigationBarTitleText: '更新说明',
    };
    constructor(props) {
        super(props)
        this.state = {
            content: {}
        }
    }
    componentWillMount() {
        const version = this.$router.params.version
        switch (version) {
            case 'v100':
                this.setState({ content: v100 })
                break;
            case 'v110':
                this.setState({ content: v110 })
                break;
            default:
                break;
        }
    }
    toCreate() {
        Taro.navigateTo({ url: '/pages/edit/index?isInit=0&reportId=' })
    }

    render() {
        const { content } = this.state
        return (
            <View className='VersionDetail'>
                <View className='title'>{content.title}</View>
                <View className='version'>{content.version}</View>
                <View className='content'>
                    {content.bold && content.bold.map((item) => (
                        <View><Text style={{ fontWeight: 'bold' }}>{item.boldtext}</Text>{item.normaltext}</View>
                    ))}
                    {content.text}
                </View>
                <AtButton type='primary' circle onClick={this.toCreate} className='p-button'>立即体验</AtButton>
                <View className='foot'>若有使用问题，请咨询客服 010-5751 0088-8018</View>
            </View>
        )
    }
}

export default VersionDetail
