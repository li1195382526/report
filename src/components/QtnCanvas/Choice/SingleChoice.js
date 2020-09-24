import Taro, { Component } from '@tarojs/taro'
import { View,Radio } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtInput, AtIcon  }  from 'taro-ui'
import './style/choice.scss'
import { connect } from '@tarojs/redux';
import {fromJS} from 'immutable'

@connect(({ answer,edit,home, common }) => ({
  ...answer,
  ...edit,
  ...home,
  ...common
}))
class SingleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          value:false
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val){
    const {opts,anw} = this.props
    let newAnw = fromJS(anw)
    const premise = `${opts.mySeq}(${val.mySeq})`
    // eslint-disable-next-line no-undef
    newAnw = newAnw.set(opts.mySeq, [premise])
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        anw:newAnw.toJS()
      }
    })
  }

  render() {
    const {opts,anw} = this.props
    return (
      <View className='single-choice'>
        {opts.optlist.map((val)=> {
          const premise = `${opts.mySeq}(${val.mySeq})`
          const answer = fromJS(anw).find(answer => answer.indexOf(premise) === 0)
          const isSelected = answer !== undefined
          return (
            <View className='single-opts'>
              <View>{val.label}</View>
              <View>
                <Radio value='选中' checked={isSelected} onClick={()=>this.handleChange(val)}></Radio>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default SingleChoice
