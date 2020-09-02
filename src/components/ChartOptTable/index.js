import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import cx from 'classnames'
import * as utils from '../../utils/utils'
import * as echarts from '../ec-canvas/echarts'
import './index.scss'

class ChartOptTable extends Component {

  config = {
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  state = {
    ec: {
      // onInit: initChart
      lazyLoad: true
    }
  }

  componentWillMount = () => {
    this.getData()
  }

  getData = () => {
    this.setState({
      ec: {
        onInit: this.initEchart
      }
    })
    
  }

  initEchart = (canvas,width,height) => {
    const {qt, isEmpty} = this.props
    const data1 = []
    const data4 = []
    const data2 = []
    const data3 = []

    !isEmpty &&
      qt.items.map((opt, index) => {
        data1.push(utils.strip(opt.label))
        if (index % 2 == 0) {
          data4.push(utils.strip(opt.label))
        } else {
          data4.push('\n' + utils.strip(opt.label))
        }
        data2.push(opt.count)
        data3.push({
          value: opt.count,
          name:
            utils.strip(opt.label) +
            '[' +
            opt.count +
            '个(' +
            opt.percent +
            ')]'
        })
      })

      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      
      Chart.clear()
      Chart.setOption(this.getOption(data4, data2));
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
   
  }

  getOption = (data1, data2) => {
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data1,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          type: 'bar',        
          data: data2
        }
      ]
    }

    return option
  }

  render() {
    const { qt, isEmpty } = this.props
    const isSelect = qt.type !== 2 && qt.type !== 7 && qt.type !== 11//如果是填空题或图片上传题

    return (
      <View className='ChartOptTable-wrap'>
        <View className='data'>
          {!isEmpty && (
            <View className='table'>

              <View className='tr'>
                <View className='th right'>序号</View>
                <View className='th right'>选项内容</View>
                <View className='th right'>计数</View>
                <View className='th'>百分比</View>
              </View>

              {qt && qt.items && qt.items.map((opt, key) => (
                <View className={cx({
                  alter: key % 2 != 0,
                  tr: true
                })} key={opt.optMySeq}>
                  <View className='td right'>{key + 1}</View>
                  <View className='td right'>
                    {opt.label.replace(/<[^>]+>/g,"")}
                  </View>
                  <View className='td right'>{opt.count}</View>
                  <View className='td right'>{opt.percent}</View>
                </View>
              ))}

            </View>
          )}

        </View>
        <View className='num'>
          答题人数：
          {qt.count}
        </View>
        {isSelect && (
        <View className='echarts'>
          <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
        </View>
        )}
      </View>
    )
  }
}

export default ChartOptTable
