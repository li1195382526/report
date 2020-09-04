import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList,AtListItem,AtInput,AtTextarea } from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Link } from '../../components/link'
import './index.scss';
import {Question} from '../../components/Question'
import { QtSet } from '../../components/QtSet'

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

  handleRelease = () =>{
    Taro.navigateTo({
      url: '/pages/release/index'
     })
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
             <View className='edit-title'>填报主题</View> 
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
           <View className='edit-title'>填报题目</View>
           <Question />
       </View>
        <View>
          <View className='edit-title'>填报设置</View>
          <QtSet />
        </View>
      <View className='edit-footer'>
        <View className='edit-save'>
          保存
        </View>
        <View className='edit-send' onClick={this.handleRelease}>
          发布填报
        </View>
      </View>
      </View>
    )
  }
}

export default Edit;
