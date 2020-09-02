import Taro, { Component } from '@tarojs/taro';
import { View, Text,Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'

@connect(({ Edit, home, common }) => ({
  ...Edit,
  ...home,
  ...common
}))

class Edit extends Component {
  config = {
    navigationBarTitleText: '编辑填报',
  };

  constructor(props) {
    super(props)
    this.state = {
        timeSel: '12:01',
        dateSel: '2018-04-22'
    }
  }

  componentWillMount() {
   
  };

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleChange(){

  }

  render() {
      const qtn = [
        {
            "pageName":"第1页",
            "qtList":[
                {
                    "conf":{

                    },
                    "fixSeq":"Q1", 
                    "mySeq":"D1",
                    "opts":[

                    ],
                    "text":"为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与，现在我们就马上开始吧！",
                    "type":6
                }
            ],
            "qtList":[
                {
                    "conf":{

                    },
                    "fixSeq":"Q2", 
                    "mySeq":"Q1",
                    "opts":[

                    ],
                    "text":"为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与，现在我们就马上开始吧！",
                    "type":1
                }
            ],
            "qtnId":90242,
            "title":"第1页"
        }
    ]
    return (
      <View className='edit'>
          <View>
             <View>填报主题</View> 
             <View>
             <AtInput
               name='value' 
               type='text'
               placeholder='请输入填报主题名称'
               value={this.state.value}
               onChange={this.handleChange.bind(this)}
             />
             </View>
             <AtTextarea
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                maxLength={200}
                placeholder='请输入填报说明描述'
              />
          </View>
       <View>
           <View>填报题目</View>
           <Question />
       </View>
        <View>
        <View>填报设置</View>
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
               onSwitchChange={this.handleChange}
             />
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
      </View>
    )
  }
}

export default Edit;
