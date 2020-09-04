import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane, AtNavBar } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ NameList, home, common }) => ({
  ...NameList,
  ...home,
  ...common
}))

class NameList extends Component {
  config = {
    navigationBarTitleText: '填报名单',
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
      <View className='namelist'>
       <View className='list-import'>
           <View>导入名单</View>
           <View>引用名单库</View>
       </View>
       <View>

       </View>

      </View>
    )
  }
}

export default NameList;
