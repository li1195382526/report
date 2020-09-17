import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtModal,AtModalHeader,AtModalContent,AtModalAction}  from 'taro-ui'
import './index.scss'

class Model extends Component {
  constructor(props) {
      super(props)
      this.state = {
    
      } 
  }

  render() {
      const {isLimit,handleClose,hint} = this.props
    return (
        <View>
          <AtModal isOpened={isLimit}>
            <AtModalHeader>标题</AtModalHeader>
            <AtModalContent>
              {hint}
            </AtModalContent>
            <AtModalAction><Button onClick={handleClose}>知道了</Button></AtModalAction>
          </AtModal>
        </View>
    )
  }
}

export default Model
