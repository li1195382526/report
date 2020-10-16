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
        this.getPeriods = this.getPeriods.bind(this)
    }
    // 获取周期
    getPeriods() {
        const reportId = this.$router.params.reportId
        this.props.dispatch({
            type: 'answerDetail/getPeriods',
            url: `/v3/report/${reportId}/peroids`
        })
    }
    // 查看单个样本答题数据
    lookAnswerResultById() {
        const mobile = Taro.getStorageSync('mobile')
        const reportId = this.$router.params.reportId
        console.log(this.props.periods)
        this.props.dispatch({
            type: 'answerDetail/getDetail',
            payload: {},
            url: `/v3/report/${reportId}/period/periodCount/participant/${mobile}/result`
        })
    }
    onChange() {

    }
    // 修改填报
    handleEdit(index) {
        Taro.navigateTo({url: `../answer/index?from=answerDetail&listId=${this.$router.params.reportId}&period=${index+1}`})
    }

    componentWillMount() {
        this.getPeriods()
    }

    componentDidMount() {
        // this.lookAnswerResultById()
    }

    render() {
        const { detail, periods } = this.props
        const qtnId = 52
        const index = periods.findIndex((item) => item.isCurrent == 1)
        const canEdit = this.$router.params.canEdit
        return (
            <View className="content">
                <View className="main">
                    <View className='view-data'>
                        <AtSteps
                            className='data-step'
                            items={periods}
                            current={this.state.current}
                            onChange={this.onChange}
                        />
                        <View className="view-plain">
                            <View className='view-text'>当前进行至第 {index + 1} 周期</View>
                            <View className='view-text'>截止时间 {periods[index].endTime}</View>
                        </View>
                    </View>
                    <View className='handle'>
                        <View>2020-8-25填答</View>
                        {canEdit == 1 && (
                            <View className="edit" onClick={(val)=>this.handleEdit(index)}>修改填报</View>
                        )}
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
