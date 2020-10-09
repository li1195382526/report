import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtSteps } from 'taro-ui'
import AnswerOptList from './AnswerOptList'
import AnswerOpenList from './AnswerOpenList'
import AnswerSubList from './AnswerSubList'
import './index.scss';

@connect(({ common, answerDetail }) => ({
    ...common,
    ...answerDetail
}))

class answerDetail extends Component {
    config = {
        navigationBarTitleText: '填报记录',
    };
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
        this.lookAnswerResultById = this.lookAnswerResultById.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    // 查看单个样本答题数据
    lookAnswerResultById() {
        const mobile = Taro.getStorageSync('mobile')
        const reportId = 52
        this.props.dispatch({
            type: 'answerDetail/getDetail',
            payload: {},
            url: `/v3/report/${reportId}/period/periodCount/participant/${mobile}/result`
        })
    }
    onChange() {

    }
    // 修改填报
    handleEdit() {
        Taro.navigateTo({url: '../answer/index'})
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.lookAnswerResultById()
    }

    render() {
        const { detail } = this.props
        const qtnId = 52
        const items = [
            { 'title': ''},
            { 'title': '' },
            { 'title': '' }
          ]
        return (
            <View className="content">
                <View className="main">
                    <View className='view-data'>
                        <AtSteps
                            className='data-step'
                            items={items}
                            current={this.state.current}
                            onChange={this.onChange}
                        />
                        <View className="view-plain">
                            <View className='view-text'>当前进行至第2周期</View>
                            <View className='view-text'>截止时间2020-09-12 23:59</View>
                        </View>
                    </View>
                    <View className='handle'>
                        <View>2020-8-25填答</View>
                        <View className="edit" onClick={this.handleEdit}>修改填报</View>
                    </View>
                    <View className="answer__info">
                        {detail.map((doc, key) => (
                            <View className="answer__qtn" key={key}>
                                <View className="qtn__title">{doc.qtDescn}</View>
                                {doc.subList ? (
                                    <AnswerSubList subList={doc.subList || []} />
                                ) : doc.type === 2 ? (
                                    <AnswerOpenList
                                        selectType={doc.selectType}
                                        optList={doc.optList || []}
                                    />
                                ) : (
                                    <AnswerOptList optList={doc.optList || []} qtnId={qtnId} type={doc.type} doc={doc} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

        )
    }

}

export default answerDetail
