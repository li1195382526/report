import Taro, { Component } from '@tarojs/taro'
import { View,Picker } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtList,AtListItem, }  from 'taro-ui'
import './index.scss'

class QtSet extends Component {
  constructor(props) {
      super(props)
      this.state = {
        timeSel: '12:01',
        dateSel: '2018-04-22',
        setName:false
      }
      this.handelSetName = this.handelSetName.bind(this)
      this.handleName = this.handleName.bind(this)
  }

  handleChange(){

  }

  handleName (){
      this.setState({
        setName:true
      })
  }

  handelSetName(){
    Taro.navigateTo({
      url: '/pages/nameList/index'
     })
  }
  
  render() {
    const {setName} = this.state
    return (
        <View>
        <View>
          <Picker mode='date' onChange={this.onDateChange}>
              <AtList>
                <AtListItem title='请选择日期' extraText={this.state.dateSel} />
              </AtList>
            </Picker>
            <Picker mode='time' onChange={this.onTimeChange}>
              <AtList>
                <AtListItem title='请选择时间' extraText={this.state.timeSel} />
              </AtList>
            </Picker>
          </View>
          <AtList>
              <AtListItem title='标题文字' onClick={this.handleClick}>
              </AtListItem>
              <AtListItem
                title='填报名单'
                isSwitch
                onSwitchChange={this.handleName}
              />
              {setName && (<AtListItem title='名单设置'  extraText='未设置' onClick={this.handelSetName} arrow='right'/>)}
                <AtListItem
                  title='填写周期'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                <AtListItem
                  title='允许填报人修改'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                <AtListItem
                  title='严格填报'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
                <AtListItem
                  title='填报密码'
                  isSwitch
                  onSwitchChange={this.handleChange}
                />
          </AtList>
        </View>
    )
  }
}

export default QtSet
