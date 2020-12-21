import Taro, { Component } from '@tarojs/taro'
import { View, Editor } from '@tarojs/components'
import PropTypes from 'prop-types';
import { AtRadio }  from 'taro-ui'
import './index.scss'
import Questionnaire from './Questionnaire'
import { connect } from '@tarojs/redux';
import NewQuestion from './NewQuestion'


@connect(({eidt,home, common }) => ({
  ...eidt,
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

  static defaultProps = {
    questionnaire: {}
  };
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
    return (
      <View className=''>
        {!!questionnaire.pageList ? questionnaire.pageList.map((item, key) => (
            !!questionnaire ? <Questionnaire  data={item} index={key} key={key}/>: null
        )
        ):''}
        <NewQuestion />
      </View>
    )
  }
}

export default Question
