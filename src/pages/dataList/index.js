import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtListItem, AtModal, AtModalHeader, AtModalAction, AtModalContent, AtTextarea, AtActionSheet, AtActionSheetItem, AtMessage, AtCheckbox  } from 'taro-ui'
import image from '../../assets/images/u128.png'
import './index.scss';

@connect(({ dataList, home, common }) => ({
	...dataList,
	...home,
	...common
}))

class DataList extends Component {
	config = {
		navigationBarTitleText: '名单库',
	};

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			value: '',
			name: '',
			nameList: '',
			isMenge: false,
			listId: '',
			userId: '',
			checkedList: []
		}
		this.getDataList = this.getDataList.bind(this)
		this.handleAddNameList = this.handleAddNameList.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.handleManage = this.handleManage.bind(this)
		this.handleModify = this.handleModify.bind(this)
		this.delItem = this.delItem.bind(this)
		this.cancel = this.cancel.bind(this)
		this.checkedChange = this.checkedChange.bind(this)
		this.formatName = this.formatName.bind(this)
		this.formatList = this.formatList.bind(this)
	}

	componentWillMount() {
	};
	
	componentDidMount() {
		this.props.dispatch({
			type: 'dataList/resetReleaseData',
		}) // 清空引用
		this.getDataList()
	}

	//获取名单库
	getDataList() {
		const { userinfo } = this.props
		const params = {
			current: 1,
			pageSize: 10
		}
		this.props.dispatch({
			type: 'dataList/getNamelist',
			payload: params,
			token: this.props.token,
			url: `/v3/reportuser/${userinfo.id}/namelist`
		})
	}

	//添加名单库
	handleAddNameList() {
		this.setState({
			isOpen: true,
		})
	}

	handleChange(value) {
		this.setState({
			nameList: value.detail.value.replace(/(^\s*)|(\s*$)/g, "")
		})
	}
	formatName(value) {
		this.setState({
			name: value.detail.value.replace(/(^\s*)|(\s*$)/g, ""),
		})
	}

	formatList(value) {
		this.setState({
			nameList: value.detail.value.replace(/(^\s*)|(\s*$)/g, "")
		})
	}
	handleChangeName(value) {
		this.setState({
			name: value.detail.value.replace(/(^\s*)|(\s*$)/g, ""),
		})
	}

	handleConfirm() {
		const { name, nameList } = this.state
		const { userinfo } = this.props
		if(!name) {
			Taro.atMessage({
				'message': '标题不能为空',
				'type': 'error',
				'duration': 1500
			})
			return
		}
		if(!nameList) {
			Taro.atMessage({
				'message': '名单不能为空',
				'type': 'error',
				'duration': 1500
			})
			return
		}
		const params = {
			title: name,
			data: nameList
		}
		this.props.dispatch({
			type: 'dataList/create',
			payload: params,
			token: this.props.token,
			url: `/v3/reportuser/${userinfo.id}/namelist/create`
		}).then(() => {
			this.cancel()
			this.getDataList()
		})
	}

	handleManage(item) {
		this.setState({
			isMenge: true,
			// eslint-disable-next-line react/no-unused-state
			listId: item.id,
			userId: item.creatorId
		})
	}

	// 修改名单库
	handleModify() {
		const { listId, userId } = this.state
		this.cancel()
		Taro.navigateTo({
			url: `/pages/manage/index?listId=${listId}&userId=${userId}`
		})
	}
	// 删除名单库
	delItem() {
		this.cancel()
		Taro.showLoading({
			title: '正在删除...',
		})
		this.props.dispatch({
			type: 'dataList/delList',
			token: this.props.token,
			url: `/v3/reportuser/${this.state.userId}/namelist/${this.state.listId}`
		}).then(()=>{
			this.getDataList()
		})
	}
	// 取消
	cancel() {
		this.setState({ isMenge: false, isOpen: false, name: '', nameList: '' })
	}
	// 选框change
	checkedChange(value) {
		this.setState({checkedList: value})
	}
	// 引用名单
	handleRelease() {
		const { checkedList } = this.state
		if(checkedList.length) {
			Taro.showLoading({
				title: '正在处理...',
			})
			for(var i in checkedList) {
				this.props.dispatch({
					type: 'dataList/release',
					token: this.props.token,
					now: i,
					end: checkedList.length - 1,
					url: `/v3/reportuser/${checkedList[i].creatorId}/namelist/${checkedList[i].id}`
				})
			}
		} else {
			Taro.redirectTo({
				url: '/pages/nameList/index?from=dataList'
			})
		}
	}

	render() {
		const { isOpen, isMenge, nameList, name } = this.state
		const { dataList } = this.props
		const from = this.$router.params.from
		return (
			<View>
				<AtMessage />
				<View className="content">
					{dataList.length == 0 && <Image src={image} className='list-img' />}
					{dataList.map((item, key) => (
						<View key={key} className='list-item'>
							{/* <View className='checkobox-data'><Checkbox value={key} onClick={this.checkedChange} dataItem={item} dataKey={key}></Checkbox></View> */}
							{from == 'nameList' && 
								<AtCheckbox
									options={[{value: item, label:''}]}
									selectedList={this.state.checkedList}
									onChange={this.checkedChange}
									className='checkobox-data'
								/>
							}
							<View className='item-content' onClick={() => this.handleManage(item)}>
								<View className="left">
									<View className='title'>{item.tilte}</View>
									<View className='count'>共{item.totalCount}人</View>
								</View>
								<View className="right">管理 &gt;</View>
							</View>
							{/* <AtListItem title={item.tilte} note={`共 ${item.totalCount} 人`} arrow='right' extraText='管理' onClick={() => this.handleManage(item)} /> */}
						</View>
					))}
				</View>
				<View className='edit-footer'>
					<View className='edit-save' onClick={this.handleAddNameList}>
						添加名单组
					</View>
					{from == 'nameList' && <View className='edit-send' onClick={this.handleRelease}>引用名单</View>}
				</View>

				{isOpen && (
					<AtModal isOpened={isOpen} closeOnClickOverlay={false}>
						<AtModalHeader>添加填报名单</AtModalHeader>
						<AtModalContent>
							<View className="daa-data">
								<AtTextarea
									showConfirmBar={true}
									count={false}
									value={name}
									onChange={this.handleChangeName}
									height={50}
									maxLength={20}
									textOverflowForbidden={true}
									placeholder='请输入名单的标签名称'
									onBlur={this.formatName}
								/>
							</View>
							<View className='daa-data'>
								<AtTextarea
									showConfirmBar={true}
									count={false}
									value={nameList}
									onChange={this.handleChange}
									height={200}
									maxLength={200}
									placeholder={`请输入名单，以及名单关联的填报人员微信手机号，参考以下示例：\n小明，13545678921\n小芳,15893839373`}
									onBlur={this.formatList}
								/>
							</View>
							<View style={{textAlign:'center'}}>可将名单信息快捷粘贴至文本框</View>
						</AtModalContent>
						<AtModalAction> <Button onClick={this.cancel}>取消</Button> <Button onClick={this.handleConfirm}>确定</Button> </AtModalAction>
					</AtModal>
				)}

				<AtActionSheet isOpened={isMenge} onClose={this.cancel}>
					<AtActionSheetItem onClick={this.handleModify}>
						修改名单组
            		</AtActionSheetItem>
					<AtActionSheetItem onClick={this.delItem}>
						删除名单组
            		</AtActionSheetItem>
					<AtActionSheetItem onClick={this.cancel}>
						取消
            		</AtActionSheetItem>
				</AtActionSheet>
			</View>
		)
	}
}

export default DataList;
