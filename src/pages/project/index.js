import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Project from '../../components/project'
import './index.scss';

@connect(({project,  common}) => ({
  ...project,
  ...common
}))

class Index extends Component {
  config = {
    navigationBarTitleText: '项目列表',
  };

  constructor(props) {
    super(props)
    this.state = {
      pageSize: 6,
      status: '-1',
      prjType: '',
      sortOrder: 'desc',
      prjName: '',
      createTimeBegin: '',
      createTimeEnd: '',
    }
  }

  componentWillMount() {
    this.getData()
  }

  componentDidMount = () => {
  };
  
  componentWillUnmount = ()=>{
    this.props.dispatch({
      type: 'project/save',
      payload: {
        page: 1,
        prjList: []
      },
    });
  }

  componentDidShow = () => {
    this.getData()
  }

  getData() {
    const {
      pageSize,
      status,
      createTimeBegin,
      createTimeEnd,
      prjType,
      userId,
      sortOrder,
      prjName
    } = this.state

    const { page } = this.props

    let params = {
      page,
      pageSize,
      prjName,
      status,
      prjType,
      userId,
      sortOrder,
      createTimeBegin:
        createTimeBegin == ''
          ? createTimeBegin
          : createTimeBegin + ' 00:00:00',
      createTimeEnd:
        createTimeEnd == '' ? createTimeEnd : createTimeEnd + ' 23:59:59'
    }

    //获得问卷类型
    this.props.dispatch({
      type: 'project/getQuestionaireTypes',
      payload: {},
      token: this.props.token
    })
   
    //获得项目列表
    this.props.dispatch({
      type: 'project/queryProjects',
      payload: params,
      token: this.props.token
    })   

  }
 
  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'project/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.getData()
  }


  render() {
    const { prjList, qtnTypes } = this.props
    
    const qtProps = {
      qtnTypes,
      userId: this.props.userinfo.id
    }

    return (
      <View className='page'>
        <View className='project'>
          {prjList && prjList.map((item, key) => (
            // <View>({item.id}){item.qtnTitle}</View>
            <View key={item.id}>
              <Project prj={item} index={key}  {...qtProps} />
            </View>

          ))}
        </View>
      </View>
    )
  }
}

export default Index;
