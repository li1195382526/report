import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ChartText } from '../ChartText'
import { ChartSubTable } from '../ChartSubTable'
import { ChartOptTable } from '../ChartOptTable'
import PropTypes from 'prop-types';
import { AtGrid,AtIcon,AtTabBar } from "taro-ui"
import './index.scss'
import image from '../../assets/images/u3232.png'

class TemplateText extends Component {
  config = {
    navigationBarTitleText: '模板库',
  };

  constructor(props) {
    super(props)
    this.state = {
      currentBar:1
    }
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

    return (
      <View className='tempalate-box'>
        <View className='list'>
          <View className='list-img'>
          <Image src={image} className='data-img'/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <Image src={image} className='data-img'/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <Image src={image} className='data-img'/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <Image src={image} className='data-img'/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <img src="" alt=""/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <img src="" alt=""/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <img src="" alt=""/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='25' color='#ccc'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <View className='list'>
          <View className='list-img'>
            <img src="" alt=""/>
          </View>
          <View className='list-data'>
            <View className='list-title'>
            暑假学生作业完成情况
            </View>
            <View className='list-description'>
            为了更好的收集各学科作业，请各位家长配合填写记录单
            </View>
            <View className="list-num">
              <View className='list-clock'>打卡</View>
              <View><AtIcon value='eye' size='30' color='#F00'></AtIcon>275</View>
            </View>
          </View>
        </View>
        <AtTabBar
            fixed
            tabList={[
              { title: '首页', iconType: 'bullet-list' },
              { title: '模板库', iconType: 'camera' },
              { title: '个人中心', iconType: 'folder' }
            ]}
            onClick={this.handleClickBar.bind(this)}
            current={this.state.currentBar}
          />
      </View>
    )
  }
}

export default TemplateText
