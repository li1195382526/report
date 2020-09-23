import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtListItem, AtModal, AtModalHeader, AtModalAction, AtModalContent, AtTextarea, AtActionSheet, AtActionSheetItem, AtMessage } from 'taro-ui'
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
			isOpen: false,
			value: '',
			name: '',
			nameList: '',
			isMenge: false,
			listId: '',
			userId: ''
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
	}

	componentWillMount() {

	};

	componentDidMount() {
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
			// eslint-disable-next-line react/no-unused-state
			nameList: value.target.value
		})
	}

	handleChangeName(value) {
		this.setState({
			// eslint-disable-next-line react/no-unused-state
			name: value.target.value,
		})
	}

	handleConfirm() {
		const { name, nameList } = this.state
		const { userinfo } = this.props
		const params = {
			title: name,
			data: nameList
		}
		this.props.dispatch({
			type: 'dataList/create',
			payload: params,
			token: this.props.token,
			url: `/v3/reportuser/${userinfo.id}/namelist/create`
		})
		this.setState({
			isOpen: false
		})
		this.getDataList()
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
		let params = {
			userId: this.state.userId,
			listId: this.state.listId,
		}
		this.cancel()
		Taro.showLoading({
			title: '正在删除...',
		})
		this.props.dispatch({
			type: 'dataList/delList',
			payload: params,
			token: this.props.token,
			url: `/v3/reportuser/${this.state.userId}/namelist/${this.state.listId}`
		})
	}
	// 取消
	cancel() {
		this.setState({ isMenge: false, isOpen: false, name: '', nameList: '' })
	}

	render() {
		const { isOpen, isMenge, nameList, name } = this.state
		const { dataList } = this.props
		const personalCenter = this.$router.params.from == 'personalCenter'
		return (
			<View>
				<AtMessage />
				{dataList.map((item, key) => (
					<View key={key}>
						{/* <Checkbox value='选中' checked className='checkobox-data'></Checkbox> */}
						<AtListItem title={item.tilte} note={`共 ${item.totalCount} 人`} arrow='right' extraText='管理' onClick={() => this.handleManage(item)} />
					</View>
				))}
				<View className='edit-footer'>
					<View className='edit-save' onClick={this.handleAddNameList}>
						添加名单组
					</View>
					{!personalCenter && <View className='edit-send' onClick={this.handleRelease}>引用名单</View>}
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
									maxLength={200}
									placeholder='请输入名单的便签名称'
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
