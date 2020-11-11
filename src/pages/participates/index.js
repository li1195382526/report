import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtCard } from 'taro-ui'
import image from '../../assets/images/u128.png'
import './index.scss';

@connect(({ home, common }) => ({
  ...home,
  ...common
}))

class Participates extends Component {
  config = {
    navigationBarTitleText: '收集数据',
  };
  constructor(props) {
    super(props)
    this.state = {
      opened: true,
      status: ''
    }
    this.getParticipantlist = this.getParticipantlist.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillMount() {

  };
  componentDidMount() {
    const token = this.props.token || Taro.getStorageSync('token');
    if (!token) {

    } else {
      this.getParticipantlist()
    }
  }

  componentDidShow = () => {
    this.getParticipantlist()
  }

  // 获取我参与的列表
  getParticipantlist() {
    const mobile = Taro.getStorageSync('mobile')
    this.props.dispatch({
      type: 'home/getParticipantlist',
      token: this.props.token,
      url: `/v3/report/participant/${mobile}/list`
    })
  }
  submit(item) {
    this.setState({ status: item.status }, () => {
      if (item.status == 0) {
        Taro.navigateTo({
          url: `/pages/answer/index?listId=${item.id}&period=${item.currentPeriod}`
        })
      } else {
        this.props.handlePart(item)
      }
    })
  }

  render() {
    const { Participantlist, wxInfo } = this.props
    return (
      <View className='page'>
        {Participantlist.length == 0 && (<View style={{textAlign:'center',color:'#999'}}><Image src={image} className='list-img'/><View style={{textAlign:'center'}}>暂无数据</View></View>)}
        {Participantlist.map((item, key) => (
          <View className='participate-list' key={key} onClick={() => this.submit(item)}>
            <AtCard
              note={`${item.creatorName || wxInfo.nickName} | ${item.publishTime} | 参与${item.currentPeriod}/${item.totalPeriod}周`}
              extra={item.status == 0 ? '未填报' : item.status == 1 ? '已填报' : '已结束'}
              extraStyle={{ color: item.status == 0 ? '#d9001b' : item.status == 1 ? '#1BA918' : '#c5c5c5' }}
              title={item.title}
            >
              {item.memo}
            </AtCard>
          </View>
        ))}
      </View>
    )
  }
}

export default Participates;
