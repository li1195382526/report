import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Questionaires from '../../components/questionaire'
import './index.scss';

@connect(({ project, common }) => ({
  ...project,
  ...common
}))

class Index extends Component {
  config = {
    navigationBarTitleText: '项目问卷列表',
  };

  constructor(props) {
    super(props)
    this.state = {
      prjId: 0,
      pageSize: 6,
      status: '',
      sortOrder: 'desc',
      qtnName: '',
      view: false,
    }
  }

  componentWillMount() {
    this.setState({
      prjId: this.$router.params.id,
      view: this.$router.params.view === 'true'
    });
    this.getData(this.$router.params.id)
  }

  componentDidMount = () => {
  };

  componentWillUnmount = ()=>{
    this.props.dispatch({
      type: 'project/save',
      payload: {
        qtnPage: 1,
        prjQtnList: []
      },
    });
  }

  componentDidShow = () => {
    this.getData(this.state.prjId)
  }

  getData(prjId) {
    const {
      pageSize,
      status,
      sortOrder,
      qtnName,
      view
    } = this.state

    const { qtnPage } = this.props

    let params = {
      page: qtnPage,
      pageSize,
      prjId: Number(prjId),
      sortOrder,
      view,
      status,
      qtnName
    }

    //获得问卷
    this.props.dispatch({
      type: 'project/queryQuestionnaire',
      payload: params,
      token: this.props.token
    })

  }

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'project/save',
      payload: {
        qtnPage: this.props.qtnPage + 1,
      },
    });
    this.getData(this.state.prjId)
  }

  handleChangeStatus = (id, index, oldStatus, newStatus) => {

  }

  render() {
    const { prjQtnList, qtnTypes, prjFlag } = this.props
    const { view, prjId } = this.state

    const qtProps = {
      qtnTypes,
      prjFlag,
      prjId,
      view,
      onChangeStatus: this.handleChangeStatus
    }

    return (
      <View className='page'>
        <View className='project'>
          {prjQtnList && prjQtnList.map((item, key) => (
            // <View>({item.id}){item.qtnTitle}</View>
            <View key={item.id}>
              <Questionaires qtn={item} index={key} {...qtProps} />
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default Index;
