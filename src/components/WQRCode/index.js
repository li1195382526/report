import Taro, { Component, chooseLocation } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import PropTypes from 'prop-types'
import uQRCode from '../../../common/uqrcode.js'
import './index.scss'
var that
export default class WQRCode extends Component {
    config = {
        navigationBarTitleText: ''
    }

    componentWillMount() {

    }

    componentDidMount() {
        if (this.props.makeOnLoad) {
            this.make()
        }
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    state = {
    }

    make = async () => {
        var options = {
            canvasId: this.props.cid,
            componentInstance: this.$scope,
            text: this.props.text,
            size: this.props.size,
            margin: this.props.margin,
            backgroundColor: this.props.backgroundImage ? 'rgba(255,255,255,0)' : this.props.backgroundColor,
            foregroundColor: this.props.foregroundColor,
            logo: this.props.logo
        }

        var filePath = await this.makeSync(options)
        this.setState({
            src: filePath
        })

        if (this.props.backgroundImage) {
            filePath = await this.drawBackgroundImageSync(filePath)
            this.setState({
                src: filePath
            })
        }

        if (this.props.logo) {
            filePath = await this.drawLogoSync(filePath)
            this.setState({
                src: filePath
            })
        }

        this.makeComplete(filePath)

    }

    makeComplete = (filePath) => {
        this.props.makeComplete(filePath)
    }

    drawBackgroundImage = (options) => {
        var ctx = Taro.createCanvasContext(this.props.cid, this.$scope)

        let reg = /^(http)|(https)/

        if (reg.test(this.props.backgroundImage)) {
            console.log(this.props.backgroundImage);
            Taro.getImageInfo({
                src: this.props.backgroundImage,
                success: res => {
                    ctx.drawImage(res.path, 0, 0, this.props.size, this.props.size)

                    ctx.drawImage(options.filePath, 0, 0, this.props.size, this.props.size)
                    ctx.draw(false, () => {
                        Taro.canvasToTempFilePath({
                            canvasId: this.props.cid,
                            success: res => {
                                options.success && options.success(res.tempFilePath)
                            },
                            fail: error => {
                                options.fail && options.fail(error)
                            }
                        })
                    })
                }
            })
        } else {
            ctx.drawImage(this.props.backgroundImage, 0, 0, this.props.size, this.props.size)
            ctx.drawImage(options.filePath, 0, 0, this.props.size, this.props.size)
            ctx.draw(false, () => {
                Taro.canvasToTempFilePath({
                    canvasId: this.props.cid,
                    success: res => {
                        options.success && options.success(res.tempFilePath)
                    },
                    fail: error => {
                        options.fail && options.fail(error)
                    }
                })
            })
        }

    }

    drawBackgroundImageSync = async (filePath) => {
        return new Promise((resolve, reject) => {
            this.drawBackgroundImage({
                filePath: filePath,
                success: res => {
                    resolve(res)
                },
                fail: error => {
                    reject(error)
                }
            })
        })
    }

    fillRoundRect = (ctx, r, x, y, w, h) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.beginPath()
        ctx.arc(w - r, h - r, r, 0, Math.PI / 2)
        ctx.lineTo(r, h)
        ctx.arc(r, h - r, r, Math.PI / 2, Math.PI)
        ctx.lineTo(0, r)
        ctx.arc(r, r, r, Math.PI, Math.PI * 3 / 2)
        ctx.lineTo(w - r, 0)
        ctx.arc(w - r, r, r, Math.PI * 3 / 2, Math.PI * 2)
        ctx.lineTo(w, h - r)
        ctx.closePath()
        ctx.setFillStyle('#ffffff')
        ctx.fill()
        ctx.restore()
    }

    drawLogo = (options) => {
        var ctx = Taro.createCanvasContext(this.props.cid, this.$scope)
        ctx.drawImage(options.filePath, 0, 0, this.props.size, this.props.size)
        var logoSize = this.props.size / 4
        var logoX = this.props.size / 2 - logoSize / 2
        var logoY = logoX

        var borderSize = logoSize + 10
        var borderX = this.props.size / 2 - borderSize / 2
        var borderY = borderX
        var borderRadius = 5

        this.fillRoundRect(ctx, borderRadius, borderX, borderY, borderSize, borderSize)

        let logoSrc



        // Taro.getImageInfo({
        //     src: this.props.logo,

        //     success: res => {
        //         logoSrc = res.path
        //     },

        //     fail: error => {
        //         options.fail && options.fail(error)
        //     }
        // })
        let reg = /^(http)|(https)/

        if (reg.test(this.props.logo)) {
            Taro.getImageInfo({
                src: this.props.logo,
                success: res => {
                    ctx.drawImage(res.path, logoX, logoY, logoSize, logoSize)

                    ctx.draw(false, () => {
                        Taro.canvasToTempFilePath({
                            canvasId: this.props.cid,
                            success: res => {
                                options.success && options.success(res.tempFilePath)
                            },
                            fail: error => {
                                options.fail && options.fail(error)
                            }
                        })
                    })
                },
                fail: error => {
                    options.fail && options.fail(error)
                }
            })
        } else {
            ctx.drawImage(this.props.logo, logoX, logoY, logoSize, logoSize)

            ctx.draw(false, () => {
                Taro.canvasToTempFilePath({
                    canvasId: this.props.cid,
                    success: res => {
                        options.success && options.success(res.tempFilePath)
                    },
                    fail: error => {
                        options.fail && options.fail(error)
                    }
                })
            })
        }

    }

    drawLogoSync = async (filePath) => {
        return new Promise((resolve, reject) => {
            this.drawLogo({
                filePath: filePath,
                success: res => {

                    resolve(res)
                },
                fail: error => {
                    reject(error)
                }
            })
        })
    }

    makeSync = async (options) => {
        return new Promise((resolve, reject) => {
            uQRCode.make({
                canvasId: options.canvasId,
                componentInstance: options.componentInstance,
                text: options.text,
                size: options.size,
                margin: options.margin,
                backgroundColor: options.backgroundColor,
                foregroundColor: options.foregroundColor,
                success: res => {
                    resolve(res)

                },
                fail: error => {
                    reject(error)
                }
            })
        })
    }


    render() {
        const { cid, size } = this.props
        return (
            <View className='index'>
                <Canvas id={cid} canvasId={cid} style={`width:${size}px;height:${size}px;`} />
            </View>
        )
    }
}

WQRCode.propTypes = {
    cid: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    size: PropTypes.number,
    margin: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    // backgroundImage: PropTypes.string,
    // logo: PropTypes.string,
    makeOnLoad: PropTypes.bool,
    show: PropTypes.bool,
    makeComplete: PropTypes.func
}

WQRCode.defaultProps = {
    size: 129,
    margin: 0,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    makeOnLoad: false,
    makeComplete: () => { },
}