import { Block, View, Button, Canvas, Image } from '@tarojs/components'
import Taro, { Component} from '@tarojs/taro'
 
import './index.scss'
import imageUrl from '../../assets/images/u3232.png';
//import qrcode from '../../assets/images/code.jpg';
import { connect } from '@tarojs/redux';
 
@connect(({ edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '二维码'
  }
 
  /**
   * 初始化信息
   */
  constructor() {
    this.state = {
      url:''
    }
    this.getWXCode = this.getWXCode.bind(this)
  }
 

  componentWillMount(){
    this.getWXCode()
    //this.generateCode()
    //this.drawImage()
  }

  getWXCode(){
    const listId = this.$router.params.listId
    const parmse = {
        oid:'gh_13a2c24667b4',
        scene: `listId=${listId}`,
        width: 280,
        page:'pages/answer/index'
    }
    this.props.dispatch({
      type: 'edit/getWXCode',
      payload:parmse,
      url:`/v3/login/getWXCode`
    }).then(()=>{
      const {code} = this.props
      console.log(this.props)
      this.drawImage(`data:image/png;base64,${code}`)
    })
  }

 

  /**
   * 绘制图片的方法
   */
  async drawImage (qrcode) {
    //创建canvas对象
    let ctx = Taro.createCanvasContext('cardCanvas');
    //填充背景色
    let grd = ctx.createLinearGradient(0,0,1,500);
    grd.addColorStop(0, '#1452d0');
    grd.addColorStop(0.5, '#FFF');
    ctx.setFillStyle(grd);
    ctx.fillRect(0,0,400,500);
 
    //绘制圆形用户头像
    let { wxInfo } = this.props;
    // console.warn("wxInfo", wxInfo)
    // let res = await Taro.downloadFile({
    //   url: wxInfo.avatarUrl
    // });
    // let imageUrl = await Taro.downloadFile({
    //   url: 'https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg'
    // });
    // const url= 'https://tva1.sinaimg.cn/large/00831rSTgy1gczok56tkzj30m80m8qe4.jpg';
    ctx.save();
    ctx.beginPath();
    // ctx.arc(160,88,66,0,Math.PI * 2);
    // ctx.closePath();
    // ctx.clip();
    // ctx.stroke();
    // ctx.translate(160,88);
    ctx.drawImage(imageUrl, -20, -20, 400, 280);
    ctx.restore();
 
    // 绘制文字
    ctx.save()
    ctx.setFontSize(16)
    ctx.setFillStyle('#FFF')
    // ctx.fillText(wxInfo.nickName, 100, 200)
    ctx.setFontSize(12)
    ctx.setFillStyle('black')
    ctx.fillText('准报小程序', 20, 280)
    ctx.setFontSize(12)
    ctx.setFillStyle('#b30000')
    ctx.fillText('', 50, 300);
    ctx.setFontSize(12)
    ctx.setFillStyle('black')
    ctx.fillText('长按识别二维码', 130, 380)
    ctx.restore()
    // 绘制二维码
    // let qrcode = await Taro.downloadFile({
    //  url: 'https://tva1.sinaimg.cn/large/00831rSTgy1gczoldqrojj30hi0hi770.jpg'
    // })
    ctx.drawImage(qrcode, 30, 340, 80, 80)
    // 将以上绘画操作进行渲染
    ctx.draw()
 
  }
 
  /**
   * 保存图图片到本地
   */
  async saveCard() {
    //将canvas图片内容到出指定的大小的图片
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      destWidth: 360,
      destHeight: 450,
      canvasId: 'cardCanvas',
      fileType: 'png'
    })
    let saveRes = await Taro.saveImageToPhotosAlbum({
      filePath: res.tempFilePath
    })
    if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showModal({
        title: '图片保存成功',
        content: '图片成功保存到相册',
        showCancel: false,
        confirmText: '确认'
      })
    } else {
      Taro.showModal({
        title: '图片保存失败',
        content: '请重新尝试',
        showCancel: false,
        confirmText: '确认'
      })
    }
  }
 
  render () {
    return (
      <View className='index'>
          <View className='canvas-wrap'>
            <Canvas 
              id='card-canvas'
              className='card-canvas'
              style='width: 320px; height: 450px'
              canvasId='cardCanvas'
            >
            </Canvas>
            <Button onClick={this.saveCard} className='btn-save' type='primary' size='mini'>保存到相册</Button>
          </View>
          {/* <Image src={`data:image/png;base64,${data.data.code}`}></Image> */}
      </View>
    )
  }
 
}