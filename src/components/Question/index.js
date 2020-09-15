import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'
import './index.scss'
import Questionnaire from './Questionnaire'
import { connect } from '@tarojs/redux';


@connect(({ question,home, common }) => ({
  ...question,
  ...home,
  ...common
}))

class Question extends Component {
  constructor(props) {
      super(props)
      this.state = {
          vaule:''
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
    console.log(questionnaire)
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

export default Question
