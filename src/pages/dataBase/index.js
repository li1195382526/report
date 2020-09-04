import Taro, { Component } from '@tarojs/taro';
import { View, Text,Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'

@connect(({ DataBase, home, common }) => ({
  ...DataBase,
  ...home,
  ...common
}))

class DataBase extends Component {
  config = {
    navigationBarTitleText: '名单库',
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
      <View className='edit'>
          11
      </View>
    )
  }
}

export default DataBase;
