import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.scss'


@connect(({ home, common }) => ({
    ...home,
    ...common
}))

class UpdateInstructions extends Component {
    config = {
        navigationBarTitleText: '更新说明',
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    toDetail(version) {
        Taro.navigateTo({ url: `/pages/versionDetail/index?version=${version}`})
    }

    render() {
        return (
            <View className='UpdateInstructions'>
                <View className='card' onClick={() => this.toDetail('v100')}>
                    <View>准报小程序上线通知</View>
                    <View className='right'>2020-12-01 ＞</View>
                </View>
                <View className='card' onClick={() => this.toDetail('v110')}>
                    <View>模板库、新手引导等功能更新</View>
                    <View className='right'>2021-01-01 ＞</View>
                </View>
            </View>
        )
    }
}

export default UpdateInstructions
