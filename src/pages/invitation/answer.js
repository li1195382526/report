import Taro, { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { MAINHOST } from '../../config/index'
import './index.scss';

@connect(({ invitation, common }) => ({
  ...invitation,
  ...common
}))


class Answer extends Component {
  config = {
    navigationBarTitleText: '问卷答题',
  };

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
    this.setState({
      url: this.$router.params.url
    });
    
  };

  componentWillUnmount() {

  }

  componentDidShow = () => {

  }

  handleMessage = () => {

  }
  

  render() {
    const { url } = this.state

    let src = decodeURI(url)

    return (
      <WebView src={src} onMessage={this.handleMessage} />
    )
  }
}

export default Answer;
