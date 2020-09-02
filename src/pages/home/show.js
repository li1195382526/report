import Taro, { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { MAINHOST } from '../../config/index'
import './index.scss';

@connect(({ home, common }) => ({
  ...home,
  ...common
}))


class Show extends Component {
  config = {
    navigationBarTitleText: '问卷预览',
  };

  constructor(props) {
    super(props)
    this.state = {
      qtnId: 0,
    }
  }

  componentWillMount() {
    this.setState({
      qtnId: this.$router.params.id
    });
  };

  componentWillUnmount() {

  }

  componentDidShow = () => {

  }

  handleMessage = () => {

  }

  render() {
    const { qtnId } = this.state

    const url = MAINHOST + '/works/' + qtnId + '/preview?'
  
    return (
      <WebView src={url} onMessage={this.handleMessage} />
    )
  }
}

export default Show;
