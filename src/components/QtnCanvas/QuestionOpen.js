import Taro, { Component } from '@tarojs/taro'
import { View,Input } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput }  from 'taro-ui'
import './index.scss'
import { connect } from '@tarojs/redux';
import {fromJS} from 'immutable'

@connect(({ answer,home, common }) => ({
  ...answer,
  ...home,
  ...common
}))
class QuestionOpen extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
      this.handleChange = this.handleChange.bind(this)
  }

  static defaultProps = {
    opts: {}
  };
  handleChange(val,item){
    const {opts,anw} = this.props
    let newAnw = fromJS(anw)
    const premise = `${opts.mySeq}(${item.mySeq})_${val.target.value}`
    // eslint-disable-next-line no-undef
    newAnw = newAnw.set(opts.mySeq, [premise])
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        anw:newAnw.toJS()
      }
    })
  }

  handleBlur(val,item){
    const {opts,anw} = this.props
    let newAnw = fromJS(anw)
    const premise = `${opts.mySeq}(${item.mySeq})_${val.target.value}`
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
    const {opts,anw,noModify} = this.props
    return (
      <View className='open'>
        <View className='open-text'>
        {opts.optlist && opts.optlist.map((item,key)=>{
          const inputValue = anw[opts.mySeq] && anw[opts.mySeq][key]
          const value = inputValue && inputValue.split('_')[1]
          return(
            <Input type='text'
              key={key}
              disabled={noModify} 
              value={value}
              className='open-input' 
              onInput={(val)=>this.handleChange(val,item)} 
              onBlur={(val) =>this.handleBlur(val,item)}
            />
         )
        })}
         
        </View> 
      </View>
    )
  }
}

export default QuestionOpen
