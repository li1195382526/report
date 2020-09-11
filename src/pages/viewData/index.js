import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem,AtSteps } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ ViewData, home, common }) => ({
  ...ViewData,
  ...home,
  ...common
}))

class ViewData extends Component {
  config = {
    navigationBarTitleText: '填报记录',
  };

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  componentWillMount() {
   
  };


  handleClick = () => {

  }

  onChange (current) {
    this.setState({
      current
    })
  }

  render() {
      const items = [
        { 'title': ''},
        { 'title': '' },
        { 'title': '' }
      ]
    return (
      <View className='view'>
        <View className='view-data'>
           <AtSteps
           className='data-step'
            items={items}
            current={this.state.current}
            onChange={this.onChange.bind(this)}
           />
           <View className='view-text'>当前进行至第2期</View>
        </View>
        <View className='view-statistics'>
          <View className='view-num'>
            <View className='num'>4</View>
            <View>已填报人数</View>
          </View>
          <View className='view-num'>
            <View className='num'>6</View>
            <View>未填报人数</View>
          </View>
        </View>
        <AtList className='view-atlist'>
            <AtListItem title='杨幂' onClick={this.handleClick} extraText='查看' arrow='right'  />
            <AtListItem title='李沁' extraText='查看' arrow='right'  />
            <AtListItem title='毛晓彤' extraText='查看' arrow='right'  />
            <AtListItem title='鹿晗' extraText='查看' arrow='right'  />
       </AtList>
       <View className='view-radius'>
         全部督促
       </View>
      </View>
    )
  }
}

export default ViewData;
