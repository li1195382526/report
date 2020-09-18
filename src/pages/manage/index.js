import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtIcon,AtTextarea,AtModal, AtModalHeader,AtModalContent,AtModalAction} from 'taro-ui'
import { BeginToCollect } from '../../components/beginToCollect'
import { Quota } from '../../components/Quota'
import { Link } from '../../components/link'
import './index.scss';

@connect(({ dataList, home, common }) => ({
  ...dataList,
  ...home,
  ...common
}))

class NameList extends Component {
  config = {
    navigationBarTitleText: '管理名单',
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
    this.getName = this.getName.bind(this)
  }

  componentWillMount() {
    
  };

  componentDidMount(){
      this.getName()
  }

  getName(){
      const listId = this.$router.params.id
      const {userinfo} = this.props
        this.props.dispatch({
            type: 'dataList/getName',
            token: this.props.token,
            url:`/v3/reportuser/${userinfo.id}/namelist/${listId}`
        })
  }

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
      const {nameData,title} = this.props
    return (
      <View className='namelist'>
       <View>
           <View className='title'>标签名称</View>
           <View className='title-name'>
             <View >
               <AtTextarea
                 className='title-input'
                 count={false}
                 value={title}
                 height={50}
                 onChange={this.handleChange.bind(this)}
                 maxLength={200}
                 placeholder='库名称'
                />
            </View>  
           </View>   
       </View>
       <View className='title'>详细人员</View>
       <View className='header-color'>
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
       </View>
       
       {nameData.map((item,key)=>(
        <View className='table'>
           <View style={{marginLeft:'30px'}}>{`${key+1}.`}</View>
           <View className='name-text'>
            <input type="text" placeholder='名字' value={item.name}/>
           </View>
           <View>关联</View>
           <View><AtIcon value='close-circle' size='30' color='red'></AtIcon></View>
       </View>   
       ))}
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
