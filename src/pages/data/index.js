import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui'
import RetrievalProgress from '../../components/RetrievalProgress'
import AnswerData from '../../components/AnswerData'
import ChartData from '../../components/ChartData'
import QuotaProgress from '../../components/QuotaProgress'
import './index.scss';

@connect(({ data, common }) => ({
  ...data,
  ...common
}))

class Data extends Component {
  config = {
    navigationBarTitleText: '分析下载',
  };

  constructor(props) {
    super(props)
    this.state = {
      qtnId: 0,
      current: 0,
      pageSize: 20,
      status: null,
      startTime: null,
      endTime: null,
      view: false,
    }
  }

  componentWillMount = () => {
    console.log(this.$router.params.current)
    this.setState({
      qtnId: this.$router.params.id,
      view: this.$router.params.view,
      current : this.$router.params.current ? Number(this.$router.params.current) : 0
    });
    this.props.dispatch({
      type: 'data/save',
      payload: {
        resultPage: 1,
        resultData: [],
        answerInfo: [],
        panelInfo: {},
        chartList: []
      },
    });
  };

  // 需要返回刷新，使用该方法获取数据，对应小程序的onShow
  componentDidShow = () => {
    this.getData(this.$router.params.id)
  }

  getData = (qtnId) => {
    //获得问卷进度数据
    this.props.dispatch({
      type: 'data/getRetrievalProgress',
      payload: { qtnId },
      token: this.props.token
    })

    this.getResultData(qtnId)
    this.getChartData(qtnId)
    this.getQuotaProgress(qtnId)
  }

  getResultData = (qtnId) => {
    const { pageSize, status, startTime, endTime } = this.state
    const { resultPage } = this.props

    //获得问卷进度数据
    this.props.dispatch({
      type: 'data/getAnswerStatus',
      payload: { qtnId, page: resultPage, pageSize, status, startTime, endTime },
      token: this.props.token
    })
  }

  getChartData = (qtnId) => {
    const {  status, startTime, endTime } = this.state

    //获取答题分析数据
    this.props.dispatch({
      type: 'data/getChartStatistics',
      payload: { qtnId, status, startTime, endTime },
      token: this.props.token
    })
  }

  getQuotaProgress = (qtnId) => {
    //获取配额进度
    this.props.dispatch({
      type: 'data/getQuotaProgress',
      payload: { qtnId},
      token: this.props.token
    })
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  // 小程序上拉加载
  onReachBottom() {
    // 只允许样本数据上拉加载
    if(this.state.current===1)
    {
      const { qtnId } = this.state
      this.props.dispatch({
        type: 'data/save',
        payload: {
          resultPage: this.props.resultPage + 1,
        },
      });
      this.getResultData(qtnId)
    }
  }

  onShowResult = (resultId, index, view) => {
    const { qtnId } = this.state

    Taro.navigateTo({
      url: '/pages/data/anwserdetail?qtnId='+ qtnId + '&rid=' + resultId + '&idx=' + index + '&view=' + view
    })
  }

  render() {
    const { RetrievalProgressData } = this.props
    const { view } = this.state
    const tabList = [{ title: '回收进度' }, { title: '配额进度' },{ title: '样本数据' }, { title: '图表分析' }]

    return (
      <View className='page'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <RetrievalProgress RetrievalProgressData={RetrievalProgressData} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <QuotaProgress data={this.props.QuotaList}  onShowResult={this.onShowResult} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <AnswerData data={this.props.resultData} view={view} onShowResult={this.onShowResult} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <ChartData data={this.props.chartList} />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Data;
