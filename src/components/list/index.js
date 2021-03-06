import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem, AtNavBar,AtCard } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';
import { connect } from '@tarojs/redux';

@connect(({home, common }) => ({
  ...home,
  ...common
}))
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
        
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
   
  };

  handleClick(value) {
    // eslint-disable-next-line taro/this-props-function
    this.props.handleOpen(true,value)
}

  render() {
    const {createList} = this.props
    const wxInfo = Taro.getStorageSync('wxInfo')
    return (
      <View className='page'>
        {createList && createList.map((item,key)=>(
          <View className='create-qt' key={key}>
          <AtCard
            note={`${item.creatorName || wxInfo.nickName} | ${item.updateTime || item.createTime} | 参与${item.finishCount}/${item.totalCount||'不限'}`}
            extra={item.status == 0 ? '编辑中':item.status == 2 ? '收集中' :'已结束'}
            extraStyle={{color:item.status == 0 ? '#F59A23' : item.status == 2 ?'#1BA918' : '#c5c5c5'}}
            title={item.title}
            thumb=''
            onClick={()=>this.handleClick(item)}
          >
          {item.memo}
          </AtCard> 
          </View> 
        ))}
         
        
      </View>
    )
  }
}

export default List;
