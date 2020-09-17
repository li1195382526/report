import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtListItem} from 'taro-ui'
import { ClCheckbox } from "mp-colorui";
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ DataList, home, common }) => ({
  ...DataList,
  ...home,
  ...common
}))

class DataList extends Component {
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
   //className='checkobox-data'
    return (
     <View>
         <View>
            <Checkbox value='选中' checked>选中</Checkbox>
            <AtListItem title='育才（2）班' note='共5人' arrow='right' extraText='管理' className='Atlist-text'/>
         </View>
         <View>
            <Checkbox value='选中' checked>选中</Checkbox>
            <AtListItem title='育才（2）班' note='共5人' arrow='right' extraText='管理' className='Atlist-text'/>
         </View>
         <View>
            <Checkbox value='选中' checked>选中</Checkbox>
            <AtListItem title='育才（2）班' note='共5人' arrow='right' extraText='管理' className='Atlist-text'/>
         </View>
         <View>
            <Checkbox value='选中' checked>选中</Checkbox>
            <AtListItem title='育才（2）班' note='共5人' arrow='right' extraText='管理' className='Atlist-text'/>
         </View>
         <View>
            <Checkbox value='选中' checked>选中</Checkbox>
            <AtListItem title='育才（2）班' note='共5人' arrow='right' extraText='管理' className='Atlist-text'/>
         </View>
         <View className='edit-footer'>
            <View className='edit-save'>
            添加新名单
            </View>
            <View className='edit-send' onClick={this.handleRelease}>
            引用名单
            </View>
        </View>
     </View>
    )
  }
}

export default DataList;
