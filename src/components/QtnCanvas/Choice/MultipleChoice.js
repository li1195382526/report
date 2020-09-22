import Taro, { Component } from '@tarojs/taro'
import { View ,Checkbox} from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtIcon  }  from 'taro-ui'
import './style/choice.scss'
import { connect } from '@tarojs/redux';

@connect(({ edit,home, common }) => ({
  ...edit,
  ...home,
  ...common
}))
class MultipleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
     
  }


 

 
  
  render() {
    const {opts} = this.props
    return (
      <View className='single-choice'>
        {opts.optlist.map((val)=>(
          <View className='single-opts'>
            <View>{val.label}</View>
            <View>
            <Checkbox value='选中' checked></Checkbox>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default MultipleChoice
