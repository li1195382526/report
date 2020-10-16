import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtIcon, AtSteps, AtActionSheet, AtActionSheetItem, AtMessage } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ ViewData, home, common, answerDetail }) => ({
  ...ViewData,
  ...home,
  ...common,
  ...answerDetail
}))

class ViewData extends Component {
  config = {
    navigationBarTitleText: '填报记录',
  };

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      isFinished: false, // 默认先展示已填报的
      isMenge: false,
      itemInfo: {},
      currentReportId:'',
      currentMobile:'',
      currentPeriod:'',
      indexPeriods:0
    }
    this.handelToggle = this.handelToggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleView = this.handleView.bind(this)
    this.delItem = this.delItem.bind(this)
    this.cancel = this.cancel.bind(this)
    this.share = this.share.bind(this)
    this.getPeriods = this.getPeriods.bind(this)
    this.getResList = this.getResList.bind(this)
    this.handleRight = this.handleRight.bind(this)
    this.handleleft = this.handleleft.bind(this)
  }

  componentWillMount() {
    this.getPeriods()
  };

  //小程序分享
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: '云调查',
      path: `/pages/answer/index?listId=${this.$router.params.reportId}`,
      imageUrl: 'https://www.epanel.cn/images/answer.jpg'
    }
  }

  // 获取周期
  getPeriods() {
    const reportId = this.$router.params.reportId
    this.props.dispatch({
      type: 'answerDetail/getPeriods',
      url: `/v3/report/${reportId}/peroids`
    }).then(() => {
      const {periods} = this.props
      const index = periods.findIndex((item) => item.isCurrent == 1)
      this.setState({current: index+1})
      this.getResList()
    })
  }
  // 获取结果列表
  getResList() {
    const {periods} = this.props
    const {current} = this.state
    const reportId = this.$router.params.reportId
    const period = periods[current].num
    this.props.dispatch({
      type: 'answerDetail/getResList',
      url: `/v3/report/${reportId}/period/${period}/results`
    })
  }
  // 列表点击
  handleClick(item) {
    const {isFinished} = this.state
    this.setState({
      currentReportId:item.reportId,
      currentMobile:item.mobile,
      currentPeriod:item.period
    })
    if(isFinished) {
      this.setState({isMenge: true, itemInfo: item})
    } else {
      Taro.updateShareMenu({
        withShareTicket: true,
        success () {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
        }
      })
    }
  }
  // 步骤条change事件
  onChange (current) {
    this.setState({ current }, () => {
      this.getResList()
    })
  }
  // 已填报/未填报点击
  handelToggle() {
    let {isFinished} = this.state
    this.setState({isFinished: !isFinished})
  }
  // 查看记录
  handleView() {
    this.cancel()
    const {currentPeriod} = this.state
    Taro.navigateTo({url: `../answer/index?from=viewData&listId=${this.$router.params.reportId}&period=${currentPeriod}`})
  }

  // 删除记录
  delItem() {
    const {currentPeriod,currentMobile,currentReportId} = this.state
    this.props.dispatch({
			type: 'dataList/delList',
			token: this.props.token,
			url: `/v3/report/${currentReportId}/period/${currentPeriod}/participant/${currentMobile}/result`
		}).then(() => {
      this.getResList()
    })
    this.cancel()
  }
  cancel() {
    this.setState({isMenge: false})
  }
  share() {
    
  }

  handleRight(){
    const {indexPeriods,current} = this.state
    this.setState({
      indexPeriods:indexPeriods+1,
      current:current+1
    })
  }

  handleleft(){
    const {indexPeriods,current} = this.state
    console.log(indexPeriods)
    this.setState({
      indexPeriods:indexPeriods-1,
      current:current-1
    })
  }

  render() {
    const {isFinished, isMenge,indexPeriods} = this.state
    const {periods, resList} = this.props
    const index = periods.findIndex((item) => item.isCurrent == 1)
    const list = isFinished ? resList.finished || [] : resList.unfinished || []
    const isnone = list.findIndex(item => item.id)
    const newPeriods = periods.slice(indexPeriods,5+indexPeriods)
    console.log(this.state.current)
    return (
      <View className='view'>
        <AtMessage/>
        <View className='view-data'>
           {/* <AtSteps
             className='data-step'
             items={newPeriods}
             current={this.state.current}
             onChange={this.onChange}
           /> */}
           {periods.length > 5 && newPeriods[0].num !== 1 &&(
                <View className='view-left'>
                  <AtIcon value='chevron-left' size='30' color='#427be6' onClick={this.handleleft}></AtIcon>
                </View>
              )}
             <View className='view-step'>
               <View className='step-line'></View>
               {newPeriods.map((val)=>(
               <View style={{marginTop: this.state.current === val.num ?'-10px' : '0',zIndex:'100'}} >
                 {this.state.current === val.num && (
                   <View className='step-light'>
                   <View className='step-lightleft'></View>
                   <View className='step-lightmid'></View>
                   <View className='step-lightright'></View>
                 </View>
                 )}
                  <View className='step' style={{
                    width:this.state.current === val.num ?'30px' : '25px',
                    height: this.state.current === val.num ?'30px' : '25px',
                    lineHeight: this.state.current === val.num ?'30px' : '25px',
                   }}
                     onClick={()=>this.onChange(val.num)}
                   >                    
                     {val.num}
                    </View>
               </View>
               ))}
              </View>
              {periods.length > 5 && (
                <View className='view-right'>
                  <AtIcon value='chevron-right' size='30' color='#427be6' onClick={this.handleRight}></AtIcon>
                </View>
              )}
           <View className="view-plain">
              <View className='view-text'>当前进行至第 {index + 1} 周期</View>
              <View className='view-text'>截止时间 {periods[index].endTime}</View>
           </View>
        </View>
        <View className='view-statistics'>
          <View className={isFinished?'view-num view-num-checked':'view-num'} onClick={this.handelToggle}>
            <View className='num'>{resList.finished?resList.finished.length:0}</View>
            <View>已填报人数</View>
          </View>
          <View className={isFinished?'view-num':'view-num view-num-checked'} onClick={this.handelToggle}>
            <View className='num'>{resList.unfinished?resList.unfinished.length:0}</View>
            <View>未填报人数</View>
          </View>
        </View>
        <View className='view-atlist'>
          {list.length && list.map((item, key) => (
            // <AtListItem key={key} title={`${key+1}. 李琴`} onClick={() => this.handleClick(item)} extraText={isFinished?'2020-08-24 10:35填报':'督促填报'} arrow='right'  />
            item.id && (
              <View className='item-content' onClick={() => this.handleClick(item)} key={key}>
                <View className="left">{key+1+'.'+item.resultName}</View>
                {isFinished && (<View className="right">{item.finishTime+'填报'}&gt;</View>)}
                {!isFinished && (
                  <View className="right">
                    <Button openType='share' className='r-btn'>督促填报&gt;</Button>
                  </View>
                )}
              </View>

            )
          ))}
          {(list.length == 0 || isnone == -1) && <View className='notice'>暂无信息</View>}
        </View>
        {!isFinished && <Button className='view-radius' openType='share' onClick={this.share}>全部督促</Button>}
        <AtActionSheet isOpened={isMenge} onClose={this.cancel}>
          <AtActionSheetItem onClick={this.handleView}>
            查看记录
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.delItem}>
            删除记录
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.cancel}>
            取消
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default ViewData;
