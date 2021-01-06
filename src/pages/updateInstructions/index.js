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
        this.state = {
            data: [
                { title: '准报小程序上线通知', date: '2020-12-01', version: 'v100' },
                { title: '模板库、新手引导等功能更新', date: '2021-01-01', version: 'v110' },
            ]
        }
    }
    toDetail(version) {
        Taro.navigateTo({ url: `/pages/versionDetail/index?version=${version}` })
    }

    render() {
        const { data } = this.state
        return (
            <View className='UpdateInstructions'>
                {data.map((item, key) => (
                    <View className='card' onClick={() => this.toDetail(item.version)} key={item.version}>
                        <View>{item.title}</View>
                        <View className='right'>{item.date} ＞</View>
                    </View>
                ))}
            </View>
        )
    }
}

export default UpdateInstructions
