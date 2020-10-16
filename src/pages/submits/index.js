import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon,AtButton } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ Release, home, common }) => ({
  ...Release,
  ...home,
  ...common
}))

class Submits extends Component {
  config = {
    navigationBarTitleText: '提交填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.handleBack = this.handleBack.bind(this)
    this.handleResult = this.handleResult.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentWillMount() {
  
  };

  handleBack(){
    Taro.redirectTo({
      url: '/pages/home/index'
     })
  }
  // 查看结果
  handleResult() {
    Taro.navigateTo({url: `../answerDetail/index?reportId=${this.$router.params.reportId}&canEdit=${this.$router.params.canEdit}`})
  }

   // 修改填报
   handleEdit() {
    Taro.navigateTo({url: `../answer/index?from=answerDetail&listId=${this.$router.params.reportId}&period=${this.$router.params.period}`})
    }

  render() {
    const canEdit = this.$router.params.canEdit
    return (
      <View className='release'>
        <View className='release-check'>
          <AtIcon value='check-circle' size='100' color='#71a0f7'></AtIcon>
        </View>
        <View className='release-text'>
          填报成功
        </View>
        <View className='release-mes'>
          填报提交成功，感谢您对准报的支持
        </View>
        <View className='release-btn'>
          <View>
            <AtButton type='primary' className='btn' onClick={this.handleBack}>我要创建</AtButton>
          </View>
          {canEdit == 1 && (
            <View>
              <AtButton type='secondary' onClick={this.handleEdit}>修改填报</AtButton>
            </View>
          )}
          <View>
            <AtButton type='primary' className='view-data' onClick={this.handleResult}>查看结果</AtButton> 
          </View>
        </View>
        <View className='release-bottom'>
          <View className='release-back' onClick={this.handleBack}>返回首页</View>
          <View className='copy-right'>版权所有 © 2017 refs.cn</View>
        </View>
      </View>
    )
  }
}

export default Submits;
