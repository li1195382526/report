import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ Answer, home, common }) => ({
  ...Answer,
  ...home,
  ...common
}))

class Answer extends Component {
  config = {
    //navigationBarTitleText: '收集数据',
  };

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      qtnId: 0,
      view: false,
      canLink: true,
      canSetInv: true
    }
  }

  componentWillMount() {
    this.setState({
    
    });
  };

  render() {

    return (
      <View className='page'>
       <AtModal isOpened>
        <AtModalHeader>选择填答名单</AtModalHeader>
        <AtModalContent>
            <View>
                12321
            </View>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
        </AtModalContent>
        <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default Answer;
