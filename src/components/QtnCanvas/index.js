import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import Questionnaire from './Questionnaire'
import { connect } from '@tarojs/redux';


@connect(({answer,home, common }) => ({
  ...answer,
  ...home,
  ...common
}))

class QtnCanvas extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
  }

  componentDidMount(){
    console.log(this.props)
  }

  handleChange (value) {
    this.setState({
      value
    })
  }
  
  render() {
    const {questionnaire} = this.props
    console.log('------------------')
    return (
      <View className=''>
        {!!questionnaire.pageList ? questionnaire.pageList.map((item, key) => (
            !!questionnaire ? <Questionnaire  data={item} index={key} />: null
        )
        ):''}
      </View>
    )
  }
}

export default QtnCanvas
