import Taro, { Component } from '@tarojs/taro'
import { View ,Checkbox} from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio,AtInput, AtIcon  }  from 'taro-ui'
import './style/choice.scss'
import { connect } from '@tarojs/redux';
import {fromJS} from 'immutable'

@connect(({ answer,edit,home, common }) => ({
  ...answer,
  ...edit,
  ...home,
  ...common
}))
class MultipleChoice extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
     this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val,isSelected){
    const {anw, opts} = this.props
    const QuestionMySeq = opts.disSeq
    const premise = `${opts.disSeq}(${val.mySeq})`
    let payload = fromJS(anw)
    if (!isSelected) {
      console.log(anw.QuestionMySeq)
      const newPremise = anw[QuestionMySeq] ? anw[QuestionMySeq].concat([premise]) :[premise]
      // eslint-disable-next-line no-undef
      payload = payload.set(opts.mySeq, newPremise)
    } else {
      payload = payload.update(QuestionMySeq, item =>
        item.delete(item.findKey(opt => opt.indexOf(premise) === 0))
      )
    }
    this.props.dispatch({
      type: 'answer/save',
      payload: {
        anw:payload.toJS()
      }
    })
  }

  render() {
    const {opts,anw,noModify} = this.props
    
    return (
      <View className='single-choice'>
        {opts.optlist.map((val)=>{
          const premise = `${opts.disSeq}(${val.mySeq})`
          const answer = anw[opts.disSeq] && anw[opts.disSeq] .indexOf(premise) !== -1
          const isSelected = !!answer
          return (
            <View className='single-opts'>
              <View>{val.label}</View>
              <View>
              <Checkbox 
                disabled={noModify} 
                value='选中' 
                checked={isSelected} 
                onClick={()=>this.handleChange(val,isSelected)}
              ></Checkbox>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default MultipleChoice
