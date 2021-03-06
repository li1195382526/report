import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ common, answerDetail }) => ({
  ...common,
  ...answerDetail
}))

class AnswerOptList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ratio: 0,
      height: 0
    }
  }

  componentWillMount() {
  }
  static defaultProps = {
    optList: []
  };

  componentDidMount() {
    // const { doc } = this.props
    // if (doc.selectType == 11 || doc.selectType == 12) {
    //   const canvasWidth = this._canvas.getBoundingClientRect().width
    //   const ratio = canvasWidth / HOT_CANVAS_WIDTH
    //   const image = new Image()
    //   image.onload = () => {
    //     const { width, height } = image
    //     const zoomHeight = (canvasWidth / width) * height
    //     this.setState({
    //       height: zoomHeight,
    //       ratio,
    //     })
    //   }
    //   image.src = doc.img
    // }
  }

  render() {
    const { height, ratio } = this.state
    const { optList, type, doc } = this.props
    return (
      <View className="optlist">
        {optList.map((opt, key) => (
          <View key={key || 0}>
              <View className="qtn__opt clear-fix" style={{ display: 'block' }}>
                {!opt.img && <span>{opt.label}</span>}
                {/* <View>{opt.text ? '（ ' + opt.text + ' ）' : ''}</View> */}
                {/* {opt.img && <View style={{ background: `url(${opt.img}) 0 0 / cover no-repeat`, width: '49%', height: '162.5px', marginRight: '1%', marginTop: '6px', float: 'left' }}></View>} */}
              </View>
          </View>
        ))}
        {/* 热点题答案完整显示处理 */}
        {/* {(doc.selectType == 11 || doc.selectType == 12) && (
          <View ref={element => (this._canvas = element)} style={{ marginTop: '2px' }}>
            <View className="hot-canvas" style={{ background: `url(${doc.img}) 0 center / contain no-repeat`, width: HOT_CANVAS_WIDTH * ratio, height: height, position: 'relative' }}>
              {optList.map((item, index) => {
                let conf = JSON.parse(item.conf ? item.conf : "{}")
                return conf.rect && (
                  <View style={{ cursor: 'pointer', width: `${conf.rect.width * ratio}px`, height: `${conf.rect.height * ratio}px`, position: 'absolute', top: `${conf.rect.y * ratio}px`, left: `${conf.rect.x * ratio}px`, background: 'rgba(223, 224, 226, 0.3)' }} key={index}>
                    <span
                      className={cx('icon icon-m', doc.selectType == 11 ? 'icon-choice-selected' : 'icon-choice-multi-selected')}
                      style={{ float: 'right', margin: '5px 5px 0 0' }}
                    />
                  </View>
                )
              })}
            </View>
          </View>
        )} */}
      </View>
    )
  }
}

export default AnswerOptList
