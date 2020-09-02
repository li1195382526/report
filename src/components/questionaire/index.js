import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import PropTypes from 'prop-types';
import cx from 'classnames'
import { formatOnlyDate } from '../../utils/common'

import './index.scss'

class Questionaire extends Component {
  static propTypes = {
    qtn: PropTypes.object
  };

  static defaultProps = {
    qtn: '',
  };

  handleEdit = (id) => {
    // console.log('edit ' + id)
  }
  handleShow = (id) => {
    // console.log('show ' + id)
  }

  handleData = (id, canData) => {
    const { prjId, view } = this.props;

    let extQuery = ''
    //项目内如果可以访问数据，则默认进入数据tab
    if (prjId && canData) {
      extQuery = '&current=1'
    }
    let newView = view
    //如果项目不能访问数据，则说明不能删除，即只读
    if (prjId && !canData) {
      newView = true
    }

    Taro.navigateTo({
      url: '/pages/data/index?id=' + id + '&view=' + newView + extQuery
    })
  }

  handleInvitation = (id, canLink, canSetInv) => {
    const { prjId, view } = this.props;
    //设定开放连接查看权限
    let extQuery = '&canLink=' + canLink + '&canSetInv=' + canSetInv
    
    Taro.navigateTo({
      url: '/pages/invitation/index?id=' + id + '&view=' + view + extQuery
    })
  }

  handleShow = (id) => {
    Taro.navigateTo({
      url: '/pages/home/show?id=' + id
    })
  }

  render() {
    const { qtn, index, qtnTypes, onChangeStatus, prjFlag, prjId } = this.props;

    // let ftAction = this.handleShow.bind(this, qtn.id)
    // if (qtn.status === 0) {
    //   ftAction = this.handleEdit.bind(this, qtn.id)
    // }
    //非项目问卷默认可以显示预览
    let canShow = !prjId
    let canSetInv = !prjId
    let canLink = !prjId
    let canData = !prjId
    let canProgress = !prjId

    if (prjId) {
      qtn.tasks.map((task) => {
        //项目问卷type=1 题目制作有权限则可以预览
        if (task.taskType === 1 && task.operates && task.activated) {
          canShow = true
        }
        //项目问卷type=5 数据权限有则可以获得分析权限
        if ((task.taskType === 5) && task.operates && task.activated) {
          canData = true
        }
        //项目问卷type=6 进度权限有则可以获得分析权限
        if ((task.taskType === 6) && task.operates && task.activated) {
          canProgress = true
        }
        //项目问卷type=2 收集设置有则可以获得收集设置
        if ((task.taskType === 2) && task.operates && task.activated) {
          canSetInv = true
        }
        //项目问卷type=4 问卷收集有则可以获得开放链接
        if ((task.taskType === 4) && task.operates && task.activated) {
          canLink = true
        }
      })
    }

    return (
      <View className='questionaire-wrap'>
        <View className='InfoRow'>
          <View className='titleRow'>（ID: {qtn.id}) {qtn.qtnTitle.replace(/<[^>]+>/g,"")}</View>
          <View className='dataRow'>
            <Text>{formatOnlyDate(qtn.createTime)} </Text>
            <Text className='collect'>收集数据：<Text className='finishNum'>{qtn.finishNum}</Text></Text>
          </View>
          <View className='typeRow'>
            <Text className='typeName'>{qtnTypes[qtn.qtnType]}</Text>
            {prjFlag === 1 && (<Text className='type'>类型：<Text>{qtn.whatQtn === 2
              ? "前置"
              : qtn.whatQtn === 4
                ? "后置"
                : "外部"}</Text></Text>)}
          </View>
        </View>
        <View className='optRow at-row'>
          <View className='at-col at-col-6'>
            <Text className='statusDesc'>{qtn.statusDescn}</Text>
            <Text className={cx({
              statusDescDot_default: qtn.status === 0,
              statusDescDot_run: qtn.status === 2,
              statusDescDot_stop: qtn.status == 5
            })}>●</Text>
            {!!!prjId && (<Text className='seperator'> </Text>)}
            {/* 开启操作，只有0，5状态才可以，目标状态2 */}
            {!!!prjId && (qtn.status == 0 || qtn.status == 5) && (
              <AtIcon value='play' size='20' onClick={onChangeStatus.bind(this, `${qtn.id}`, `${index}`, `${qtn.status}`, 2)} ></AtIcon>)}
            {!!!prjId && (<Text className='seperator'> </Text>)}
            {/* 暂停操作，执行中2才可以，目标状态0 */}
            {!!!prjId && qtn.status == 2 && (<AtIcon value='pause' size='20' onClick={onChangeStatus.bind(this, `${qtn.id}`, `${index}`, `${qtn.status}`, 0)} ></AtIcon>)}
            {!!!prjId && (<Text className='seperator'> </Text>)}
            {/* 停止操作，执行中2才可以，目标状态5 */}
            {!!!prjId && qtn.status == 2 && (<AtIcon value='stop' size='20' onClick={onChangeStatus.bind(this, `${qtn.id}`, `${index}`, `${qtn.status}`, 5)} ></AtIcon>)}
          </View>
          <View className='at-col at-col-1'></View>
          <View className='at-col at-col-2'>
            {canShow && <AtIcon value='file-generic' size='20' onClick={this.handleShow.bind(this, qtn.id)} ></AtIcon>}
          </View>
          <View className='at-col at-col-2'>
            {(canLink || canSetInv) && <AtIcon value='share' size='20' onClick={this.handleInvitation.bind(this, qtn.id, canLink, canSetInv)} ></AtIcon>}
          </View>
          <View className='at-col at-col-1'>
            {(canData || canProgress) && <AtIcon value='analytics' size='20' onClick={this.handleData.bind(this, qtn.id, canData)}></AtIcon>}
          </View>
        </View>
      </View>
    )
  }
}

export default Questionaire
