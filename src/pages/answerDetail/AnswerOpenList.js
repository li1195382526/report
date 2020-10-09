import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

const AnswerOpenList = ({selectType, optList}) => (
  <View className="optlist">
    {optList.map((opt, key) => (
      <ul key={key || 0}>
        {selectType === 2 && (
          <li dangerouslySetInnerHTML={{__html: utils.strip(opt.label)}} />
        )}
        <li
          className="qtn__opt"
          dangerouslySetInnerHTML={{__html: utils.strip(opt.text)}}
        />
        <li
          className="qtn__opt"
          dangerouslySetInnerHTML={{__html: utils.strip(opt.postLabel)}}
        />
      </ul>
    ))}
  </View>
)
export default AnswerOpenList
