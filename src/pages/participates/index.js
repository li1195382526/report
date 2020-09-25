import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtCard } from 'taro-ui'
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
      currentPage:1,
      pageSize:10,
      isOpened:true
    }
    this.getParticipantlist = this.getParticipantlist.bind(this)
    this.submit = this.submit.bind(this)
    this.handleColse = this.handleColse.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
   
  };

  componentDidMount(){
    const token = this.props.token || Taro.getStorageSync('token');
    if (!token) {
     
    }else{
      this.getParticipantlist()
    }
    
  }

  //获取我参与的列表
  getParticipantlist(){
    const {currentPage, pageSize} = this.state
    const {mobile} = this.props
    const params = {
      current:currentPage,
      pageSize,
      mobile
    }
    this.props.dispatch({
      type: 'home/getParticipantlist',
      payload: params,
      token: this.props.token,
      url:`/v3/participant/${mobile}/participantlist`
    })
  }

  submit (){
    Taro.navigateTo({
      url: '/pages/answer/index'
     })
  }

  handleColse(){
    this.setState({
      isOpened:false
    })
  }

  handleData () {
    Taro.navigateTo({
    url: '/pages/viewData/index'
   })
}

  handleClick() {
    const {handlePart} = this.props
    handlePart(true)
}

  render() {
    return (
      <View className='page'>
          <View className='participate-list'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.submit}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
          <View className='participate-list'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.handleClick}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
          <View className='participate-list'>
             <AtCard
               note='小Tips'
               extra='额外信息'
               title='这是个标题'
               thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
               onClick={this.handleClick}
             >
            这也是内容区 可以随意定义功能
            </AtCard> 
          </View> 
      </View>
    )
  }
}

export default Participates;
