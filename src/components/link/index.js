import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import { QRCode } from 'taro-code'
import './index.scss'
import { AtCard, AtButton } from 'taro-ui';

class Link extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  copyUrl = () => {
    Taro.setClipboardData({
      data: this.props.linkData.weblinkUrl,
      success: function () {
        Taro.getClipboardData({
          success: function () {
          }
        })
      }
    })
  }

  onQrCodeImage = () => {
    // console.log(this.props.linkData.tcodeUrl)
    Taro.downloadFile({
      url: this.props.linkData.tcodeUrl,
      success: function (res) {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: () => {
            Taro.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          },
          fail: function () {
            console.log('error')
          }
        })
      }
    })
  }

  render() {
    const { linkData } = this.props

    let weblinkUrl = linkData ? linkData.weblinkUrl : ''

    return (
      <View className='link-wrap'>
        <View className='linkInfoRow at-row'>
          <View className='at-col'>
            <AtCard title='问卷链接'>
              <View className='at-row'>
                <View className='linkText at-col'>{weblinkUrl}</View>
              </View>
              <View className='at-row at-row__justify--end copyRow'>
                <View className='at-col at-col-3'>
                  <AtButton circle type='primary' size='small' openType='share'>分享</AtButton>
                </View>
                <View className='at-col at-col__offset-1 at-col-3'>
                  <AtButton circle type='primary' size='small' onClick={this.copyUrl}>复制</AtButton>
                </View>
              </View>
            </AtCard>
          </View>
        </View>

        <View className='linkInfoRow at-row'>
          <View className='at-col'>
            <AtCard title='二维码'>
              <View className='at-row'>
                <View className='at-col at-col-12 wordbreak copyrightInfo'>
                  郑重声明：通过二维码访问问卷进行调查所应用的“二维码调查方法及系统”发明专利 【专利号：ZL 2014 1 0026192.3】依法受保护。在中国，云调查(www.epanel.cn)拥有该专利排他性实施许可，任何第三方不得实施、使用该专利技术，本公司保留对任何侵权行为的追究权利。
                </View>
              </View>
              <View>
                <QRCode
                  text={weblinkUrl}
                  size={150}
                  scale={4}
                  errorCorrectLevel='M'
                  typeNumber={2}
                />
              </View>
              <View>
                <AtButton circle type='primary' onClick={this.onQrCodeImage}>保存图片</AtButton>
              </View>
            </AtCard>
          </View>
        </View>
      </View>
    )
  }
}

export default Link
