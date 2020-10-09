import Taro, { Component } from '@tarojs/taro';
import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components';
import { getPickerViewList, getDate, getArrWithTime, formatDate, getDayList } from './utils';
import './index.scss';

export default class DateTimePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            yearList: [],   //年 -下拉
            monthLsit: [], //月 -下拉
            dayList: [], //日 -下拉
            hourList: [], //时 -下拉
            minuteList: [], //分 -下拉
            selectIndexList: [1, 1, 1, 1, 1], //PickerViewColumn选择的索引
            current: '', //当前选择的数据
            year: '',  //时间值
            month: '',
            day: '',
            hour: '',
            minute: '',
        }
        this.setDefaultValue = this.setDefaultValue.bind(this)
        this.openModal = this.openModal.bind(this)
        this.clearHandel = this.clearHandel.bind(this)
        this.okHandel = this.okHandel.bind(this)
        this.changeHandel = this.changeHandel.bind(this)
    }

    setDefaultValue() {
        const { yearList, monthLsit, dayList, hourList, minuteList } = getPickerViewList()
        this.setState({
            yearList,
            monthLsit,
            dayList,
            hourList,
            minuteList,
        })
    }

    // 打开时间选择的模态框 - 根据当前时间初始化picker-view的数据
    openModal(fmtInitValue){
        const { yearList, monthLsit, dayList, hourList, minuteList } = this.state
        const selectIndexList = []
        const arr = getArrWithTime(fmtInitValue) //优先当前选择的值，其次默认值，其次当前值
        const [year, month, day, hour, minute] = arr
        //根据arr  数据索引
        selectIndexList[0] = yearList.indexOf(arr[0] + '年')
        selectIndexList[1] = monthLsit.indexOf(arr[1] + '月')
        selectIndexList[2] = dayList.indexOf(arr[2] + '日')
        selectIndexList[3] = hourList.indexOf(arr[3] + '点')
        selectIndexList[4] = minuteList.indexOf(arr[4] + '分')

        this.setState({
            selectIndexList,
            year,
            month,
            day,
            hour,
            minute
        })
        this.changeHandel({detail: {value: selectIndexList}})
    };

    // 清空
    clearHandel() {
        this.props.onClear && this.props.onClear();
    };

    // 确定
    okHandel() {
        const { current } = this.state
        this.props.onOk && this.props.onOk({ current })
    };

    // 切换
    changeHandel(e) {
        const selectIndexList = e.detail.value
        const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] = selectIndexList
        const { yearList, monthLsit, dayList, hourList, minuteList } = this.state
        const yearStr = yearList[yearIndex]
        const monthStr = monthLsit[monthIndex]
        const dayStr = dayList[dayIndex]
        const hourStr = hourList[hourIndex]
        const minuteStr = minuteList[minuteIndex]
        const year = Number(yearStr.substr(0, yearStr.length - 1))
        const month = Number(monthStr.substr(0, monthStr.length - 1))
        const day = Number(dayStr.substr(0, dayStr.length - 1))
        const hour = Number(hourStr.substr(0, hourStr.length - 1))
        const minute = Number(minuteStr.substr(0, minuteStr.length - 1))
        // 更新年、天数
        const newDayList = getDayList(year, month)
        const current = formatDate(year, month, day, hour, minute)
        this.setState({
            dayList: newDayList,
            year,
            month,
            day,
            hour,
            minute,
            current
        })
    }

    componentWillMount() {
        this.setDefaultValue()
    }
    componentDidMount() {
        const { initValue } = this.props
        const fmtInitValue = getDate(initValue)
        this.openModal(fmtInitValue)
    }

    render() {
        const { yearList, monthLsit, dayList, hourList, minuteList, selectIndexList } = this.state
        return (
            <View className="datetime-picker-wrap wrap-class">
                <View className="wrapper">
                    {/*日期模态框 */}
                    <View className="model-box-bg"></View>
                    <View className="model-box">
                        <View className="model-picker">
                            <View className="button-model">
                                <Text class="btn-txt" onClick={this.clearHandel}>清除</Text>
                                <Text class="btn-txt" onClick={this.okHandel}>确定</Text>
                            </View>
                            <View className="cont_model">
                                <PickerView className="pick-view" indicatorStyle="height: 50px;" value={selectIndexList} onChange={this.changeHandel}>
                                    {/*年*/}
                                    <PickerViewColumn className="picker-view-column">
                                        {
                                            yearList.length && yearList.map((item, index) =>
                                                <View key={String(index)} className="pick-view-column-item">{item}</View>)
                                        }
                                    </PickerViewColumn>
                                    {/*月*/}
                                    <PickerViewColumn className="picker-view-column">
                                        {
                                            monthLsit.length && monthLsit.map((item, index) =>
                                                <View key={String(index)} className="pick-view-column-item">{item}</View>)
                                        }
                                    </PickerViewColumn>
                                    {/*日*/}
                                    <PickerViewColumn className="picker-view-column">
                                        {
                                            dayList.length && dayList.map((item, index) =>
                                                <View key={String(index)} className="pick-view-column-item">{item}</View>)
                                        }
                                    </PickerViewColumn>
                                    {/*时*/}
                                    <PickerViewColumn className="picker-view-column">
                                        {
                                            hourList.length && hourList.map((item, index) =>
                                                <View key={String(index)} className="pick-view-column-item">{item}</View>)
                                        }
                                    </PickerViewColumn>
                                    {/*分*/}
                                    <PickerViewColumn className="picker-view-column">
                                        {
                                            minuteList.length && minuteList.map((item, index) =>
                                                <View key={String(index)} className="pick-view-column-item">{item}</View>)
                                        }
                                    </PickerViewColumn>
                                </PickerView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
