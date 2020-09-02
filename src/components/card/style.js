import Taro from '@tarojs/taro';
export default {
  Card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Taro.pxTransform(750),
    height: Taro.pxTransform(220)
  },
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Taro.pxTransform(39),
    paddingRight: Taro.pxTransform(56),
    paddingLeft: Taro.pxTransform(62),
    boxShadow: '0px 10px 30px rgba(209, 213, 223, 0.50)',
    backgroundColor: '#ffffff',
    width: Taro.pxTransform(721),
    height: Taro.pxTransform(180)
  },
  downloadDetail: { display: 'flex', flexDirection: 'row' },
  downloadDetailContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: Taro.pxTransform(90)
  },
  count: {
    opacity: 1,
    lineHeight: Taro.pxTransform(70),
    marginTop: Taro.pxTransform(10),
    whiteSpace: 'nowrap',
    color: '#15181a',
    fontFamily: 'Helvetica',
    fontSize: Taro.pxTransform(60),
    fontWeight: 400
  },
  info: {
    opacity: 1,
    marginTop: Taro.pxTransform(2),
    lineHeight: Taro.pxTransform(30),
    whiteSpace: 'nowrap',
    color: '#858997',
    fontFamily: 'Helvetica',
    fontSize: Taro.pxTransform(28),
    fontWeight: 'normal'
  },
  image: { width: Taro.pxTransform(250), height: Taro.pxTransform(97) }
};