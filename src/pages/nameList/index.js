import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon,AtInput,AtModal, AtModalHeader,AtModalContent,AtModalAction} from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ NameList, home, common }) => ({
  ...NameList,
  ...home,
  ...common
}))

class NameList extends Component {
  config = {
    navigationBarTitleText: '填报名单',
  };

  constructor(props) {
    super(props)
    this.state = {
        value:'',
        isOpen:false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubUsername = this.handleSubUsername.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleData = this.handleData.bind(this)
  }

  componentWillMount() {
    
  };

  handleChange(){

  }

  handleSubUsername(event) {
    const username = event.target.value.replace(/\t+/g, ',')
    const newUsername = username.split(' ').join(',')
    this.setState({
      username: newUsername
    })
  }

  handleOpen(){
    this.setState({
        isOpen:true
    })
  }

  onConfirm(){
    this.setState({
        isOpen:false
    }) 
  }

  onClose(){
    this.setState({
        isOpen:false
    })   
  }

  handleData(){
    Taro.navigateTo({
      url: '/pages/dataList/index'
     })
  }

  render() {
      const {isOpen} = this.state
    return (
      <View className='namelist'>
       <View className='list-import'>
           <View onClick={this.handleOpen}>导入名单</View>
           <View onClick={this.handleData}>引用名单库</View>
       </View>
       <View className='header'>
            <View>
                编号
            </View>
            <View style={{marginRight:'70px'}}>
                预设名字
            </View>
            <View>
                填报人员
            </View>
       </View>
       <View className='table'>
           <View style={{marginLeft:'30px'}}>1.</View>
           <View className='name-text'>
            <input type="text" placeholder='名字'/>
           </View>
           <View>关联</View>
           <View><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
       </View>
       <View className='table'>
           <View style={{marginLeft:'30px'}}>1.</View>
           <View className='name-text'>
            <input type="text" placeholder='名字'/>
           </View>
           <View>关联</View>
           <View><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
       </View>
       <View className='table'>
           <View style={{marginLeft:'30px'}}>1.</View>
           <View className='name-text'>
            <input type="text" placeholder='名字'/>
           </View>
           <View>关联</View>
           <View><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
       </View>
       <View className='table'>
           <View style={{marginLeft:'30px'}}>1.</View>
           <View className='name-text'>
            <input type="text" placeholder='名字'/>
           </View>
           <View>关联</View>
           <View><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
       </View>
       <AtModal isOpened={isOpen}>
            <AtModalHeader>导入填写名单</AtModalHeader>
            <AtModalContent>
                <textarea
                    className="model-input"
                    value=''
                    onChange={this.handleSubUsername}
                    placeholder='请输入/粘贴微信绑定的手机号'
                />
                <View className='model-text'>可将名单信息粘贴后导入</View>
            </AtModalContent>
            <AtModalAction> 
                <Button onClick={this.onClose}>取消</Button> 
                <Button onClick={this.onConfirm}>确定</Button> 
            </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default NameList;
