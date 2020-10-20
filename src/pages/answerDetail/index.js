import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtToast,AtIcon } from 'taro-ui'
import AnswerOptList from './AnswerOptList'
import AnswerOpenList from './AnswerOpenList'
import AnswerSubList from './AnswerSubList'
import './index.scss';

@connect(({ common, answerDetail }) => ({
    ...common,
    ...answerDetail
}))

class answerDetail extends Component {
    config = {
        navigationBarTitleText: '填报记录',
    };
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            indexPeriods:0,
            text:''
        }
        this.lookAnswerResultById = this.lookAnswerResultById.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.getPeriods = this.getPeriods.bind(this)
        this.handleRight = this.handleRight.bind(this)
        this.handleleft = this.handleleft.bind(this)
    }
    // 获取周期
    getPeriods() {
        const reportId = this.$router.params.reportId
        this.props.dispatch({
            type: 'answerDetail/getPeriods',
            url: `/v3/report/${reportId}/peroids`
        })
    }
    // 查看单个样本答题数据
    lookAnswerResultById() {
        const mobile = Taro.getStorageSync('mobile')
        const reportId = this.$router.params.reportId
        const {current} = this.state
        this.props.dispatch({
            type: 'answerDetail/getDetail',
            url: `/v3/report/${reportId}/period/${current}/participant/${mobile}/result`
        })
    }

    // 步骤条change事件
    onChange (current,isCurrent) {
        if(isCurrent >= current){
            this.setState({ current }, () => {
            this.getPeriods()
            this.lookAnswerResultById()
        })
        }else{
            this.setState({
                text:'暂无数据！还未进行到当前周期2020-10-22开启'
            })
        }
        
    }

    // 修改填报
    handleEdit(index) {
        Taro.navigateTo({url: `../answer/index?from=answerDetail&listId=${this.$router.params.reportId}&period=${index+1}`})
    }

    componentWillMount() {
        this.getPeriods()
        this.lookAnswerResultById()
    }

    componentDidMount() {
        // 
    }

    handleRight(){
        const {indexPeriods,current} = this.state
        this.setState({
          indexPeriods:indexPeriods+1,
          //current:current+1
        })
      }
    
      handleleft(){
        const {indexPeriods,current} = this.state
        console.log(indexPeriods)
        this.setState({
          indexPeriods:indexPeriods-1,
          //current:current-1
        })
      }

    render() {
        const { detail, periods,canEdit,finishTime } = this.props
        const {indexPeriods,text} = this.state
        const qtnId = 52
        const index = periods.length ? periods.findIndex((item) => item.isCurrent == 1) : 0
        const newPeriods = periods.slice(indexPeriods,5+indexPeriods)
        //const canEdit = this.$router.params.canEdit
        return (
            <View className="content">
                {text.length > 0 && (
                   <AtToast isOpened text={text}></AtToast> 
                )}
                <View className="main">
                    <View className='view-data'>
                    {periods.length > 5 && newPeriods[0].num !== 1 &&(
                <View className='view-left'>
                  <AtIcon value='chevron-left' size='30' color='#427be6' onClick={this.handleleft}></AtIcon>
                </View>
              )}
             <View className='view-step'>
               {periods.length > 1 && (
                 <View className='step-line'></View>
               )}
               {newPeriods.map((val)=>(
               <View style={{marginTop: this.state.current === val.num ?'-10px' : '0',zIndex:'100'}} >
                 {this.state.current === val.num && (
                   <View className='step-light'>
                   <View className='step-lightleft'></View>
                   <View className='step-lightmid'></View>
                   <View className='step-lightright'></View>
                 </View>
                 )}
                  <View className='step' style={{
                    width:this.state.current === val.num ?'30px' : '25px',
                    height: this.state.current === val.num ?'30px' : '25px',
                    lineHeight: this.state.current === val.num ?'30px' : '25px',
                   }}
                     onClick={()=>this.onChange(val.num,index+1)}
                   >                    
                     {val.num}
                    </View>
               </View>
               ))}
              </View>
              {periods.length > 5 && (
                <View className='view-right'>
                  <AtIcon value='chevron-right' size='30' color='#427be6' onClick={this.handleRight}></AtIcon>
                </View>
              )}
              {periods.length > 0 && (
                  <View className="view-plain">
                        <View className='view-text'>当前进行至第 {index + 1} 周期</View>
                       <View className='view-text'>截止时间 {periods[index].endTime}</View>
                   </View>
              )}
                 {periods.length === 0 && (
                  <View className="view-plain" style={{textAlign:"center"}}>
                        详细答案记录
                   </View>
              )}       
                    </View>
                    <View className='handle'>
                        <View>{finishTime}填答</View>
                        {canEdit && (
                            <View className="edit" onClick={(val)=>this.handleEdit(index)}>修改填报</View>
                        )}
                    </View>
                    <View className="answer__info">
                        {detail.map((doc, key) => (
                            <View className="answer__qtn" key={key}>
                                <View className="qtn__title">{doc.qtDescn}</View>
                                {doc.subList ? (
                                    <AnswerSubList subList={doc.subList || []} />
                                ) : doc.type === 2 ? (
                                    <AnswerOpenList
                                        selectType={doc.selectType}
                                        optList={doc.optList || []}
                                    />
                                ) : (
                                    <AnswerOptList optList={doc.optList || []} qtnId={qtnId} type={doc.type} doc={doc} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

        )
    }

}

export default answerDetail
