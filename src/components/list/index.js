import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem, AtNavBar,AtCard } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

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
    return (
      <View className='page'>
        {createList && createList.map((item,key)=>(
          <View className='create-qt'>
          <AtCard
            note={`${item.creatorName} | ${item.updateTime || item.createTime} | 参与${item.pnlCount}/${item.totalCount}`}
            extra={item.status == 0 ? '编辑中':item.status == 2 ? '收集中' :'已结束'}
            title={item.title}
            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
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
