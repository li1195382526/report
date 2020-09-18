import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtListItem,AtModal,AtModalHeader,AtModalAction,AtModalContent,AtTextarea,AtActionSheet,
   AtActionSheetItem} from 'taro-ui'
import './index.scss';

@connect(({ dataList, home, common }) => ({
  ...dataList,
  ...home,
  ...common
}))

class DataList extends Component {
  config = {
    navigationBarTitleText: '填报名单',
  };

  constructor(props) {
    super(props)
    this.state = {
        isOpen:false,
        value:'',
        name:'',
        nameList:'',
        isMenge:false,
        listId:''
    }
    this.getDataList = this.getDataList.bind(this)
    this.handleAddNameList = this.handleAddNameList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleManage = this.handleManage.bind(this)
    this.handleModify = this.handleModify.bind(this)
  }

  componentWillMount() {
    
  };

  componentDidMount(){
   this.getDataList()
  }

   //获取名单库
   getDataList(){
      const {userinfo} = this.props
      const params = {
         current:1,
         pageSize:10
      }
      this.props.dispatch({
        type: 'dataList/getNamelist',
        payload: params,
        token: this.props.token,
        url:`/v3/reportuser/${userinfo.id}/namelist`
      })
    }

    //添加名单库
    handleAddNameList(){
         this.setState({
            isOpen:true
         })
    }

    handleChange(value){
      this.setState({
         // eslint-disable-next-line react/no-unused-state
         nameList:value.target.value
      })
    }

    handleChangeName(value){
         this.setState({
            // eslint-disable-next-line react/no-unused-state
            name:value.target.value
         })
    }

    handleConfirm(){
      const {name,nameList} = this.state
      const {userinfo} = this.props
      const params = {
         title: name,
         data: nameList
      }
      this.props.dispatch({
         type: 'dataList/create',
         payload: params,
         token: this.props.token,
         url:`/v3/reportuser/${userinfo.id}/namelist/create`
       })
       this.setState({
         isOpen:false 
       })
       this.getDataList()
    }

    handleManage(id){
      this.setState({
         isMenge:true,
         // eslint-disable-next-line react/no-unused-state
         listId:id
      })
    }

    handleModify(){
       const {listId} = this.state
      Taro.navigateTo({
         url: `/pages/manage/index?id=${listId}`
        })
    }

  render() {
     const {isOpen,isMenge} = this.state
     const {dataList} = this.props
     console.log(dataList)
   //className='checkobox-data'
   //className='Atlist-text'
    return (
     <View>
        {dataList.map((item,key)=>(
           <View>
            {/* <Checkbox value='选中' checked className='checkobox-data'></Checkbox> */}
            <AtListItem title={item.tilte} note={item.totalCount} arrow='right' extraText='管理' 
            onClick={()=>this.handleManage(item.id)}/>
         </View>
        ))}
         <View className='edit-footer'>
            <View className='edit-save' onClick={this.handleAddNameList}>
            添加新名单
            </View>
            <View className='edit-send' onClick={this.handleRelease}>
            引用名单
            </View>
        </View>

        <AtModal isOpened={isOpen}>
         <AtModalHeader>标题</AtModalHeader>
         <AtModalContent>
            <View className="daa-data">
               <AtTextarea
                 count={false}
                 value={this.state.value}
                 onChange={this.handleChangeName}
                 height={50}
                 maxLength={200}
                 placeholder='请输入名单的便签名称'
               />
            </View>
            <View className='daa-data'>
               <AtTextarea
                 count={false}
                 value={this.state.value}
                 onChange={this.handleChange}
                 height={200}
                 maxLength={200}
                 placeholder='请输入名单，以及名单关联的填报人员微信手机号，参考以下示例：
               小明，13545678921,15637493638
               小芳，15893839373,18737393738'
               />
            </View>
            <View>可将名单信息快捷粘贴至文本框</View>
         </AtModalContent>
         <AtModalAction> <Button>取消</Button> <Button onClick={this.handleConfirm}>确定</Button> </AtModalAction>
         </AtModal>

         <AtActionSheet isOpened={isMenge}>
            <AtActionSheetItem onClick={this.handleModify}>
                修改名单组
            </AtActionSheetItem>
            <AtActionSheetItem>
                删除名单组
            </AtActionSheetItem>
            <AtActionSheetItem>
                取消
            </AtActionSheetItem>
          </AtActionSheet> 
     </View>
    )
  }
}

export default DataList;
