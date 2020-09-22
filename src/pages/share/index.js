import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem,AtSteps } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ share, home, common }) => ({
  ...share,
  ...home,
  ...common
}))

class Share extends Component {
  config = {
    navigationBarTitleText: '开始填报',
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
   
  };
  

  render() {
    return (
      <View className='view'>
       
      </View>
    )
  }
}

export default Share;
