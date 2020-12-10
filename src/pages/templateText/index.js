import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import { AtGrid,AtIcon,AtTabBar } from "taro-ui"
import './index.scss'
import image from '../../assets/images/u3232.png'
import { connect } from '@tarojs/redux';

@connect(({ templateText, common }) => ({
  ...templateText,
  ...common
}))

class TemplateText extends Component {
  config = {
    navigationBarTitleText: '模板库',
  };

  constructor(props) {
    super(props)
    this.state = {
      currentBar:1
    }
    this.getList = this.getList.bind(this)
    this.toEdit = this.toEdit.bind(this)
  }
  componentDidShow() {
    this.props.dispatch({
      type: 'templateText/save',
      payload: {
        current: 1,
        templist: []
      },
    });
    this.getList()
  }
  // 小程序上拉加载onReachBottom
  onReachBottom() {
    const { templist, templistTotal } = this.props
    if(templist.length < templistTotal) {
      this.props.dispatch({
        type: 'templateText/save',
        payload: {
          current: this.props.current + 1,
        },
      });
      this.getList()
    } else {
      Taro.showToast({
        title: '暂无更多数据',
        icon: 'none',
        duration: 2000
      })
    }
  }
  toEdit(id) {
    Taro.navigateTo({url: `/pages/edit/index?isInit=1&reportId=${id}&isTemplate=1`})
  }
  getList() {
    const {userinfo} = this.props
    // Taro.showLoading({title: '加载中...', mask: true})
    let params = {
      creatorId: userinfo.id,
      current: this.props.current,
      pageSize: this.props.pageSize
    }
    this.props.dispatch({
      type: 'templateText/getTemplist',
      payload: params,
      token: this.props.token,
    // }).then(() => {
    //   Taro.hideLoading()
    })
  }
  handleClickBar(value){
    switch (value) {
      case 0:
          Taro.redirectTo({
              url: '/pages/home/index'
          })
          break;
      case 1:
          Taro.redirectTo({
              url: '/pages/templateText/index'
          })
          break;
      case 2:
          Taro.redirectTo({
              url: '/pages/personalCenter/index'
          })
          break;           
      default:
          break;
    } 
  }
  render() {
    const {templist} = this.props
    return (
      <View className='tempalate-box'>
        {templist.map((item, key) => (
          <View className='list' key={key} onClick={() => this.toEdit(item.id)}>
            <View className='list-img'>
              <Image src={item.imageUrl?item.imageUrl:'https://www.epanel.cn/images/zhunbao2.jpg'} className='data-img' mode='aspectFill'/>
            </View>
            <View className='list-data'>
              <View className='list-title'>
                {item.title}
              </View>
              <View className='list-description'>
                {item.memo}
              </View>
              <View className="list-num">
                <View className='list-clock'>{item.templateLabel}</View>
                <View className='list-eye'><AtIcon value='eye' size='25' color='#ccc'></AtIcon> {item.referenceNum}</View>
              </View>
            </View>
          </View>
        ))}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '模板库', iconType: 'list' },
            { title: '个人中心', iconType: 'user' }
          ]}
          onClick={this.handleClickBar.bind(this)}
          current={this.state.currentBar}
        />
      </View>
    )
  }
}

export default TemplateText
