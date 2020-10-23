import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

const AnswerOpenList = ({selectType, optList}) => (
  <View className="optlist">
    
    {optList.map((opt, key) => (
       <View key={key}>
         <View qtn__opt>{opt.text || opt.label}</View>
      </View>
    ))}
  </View>
)
export default AnswerOpenList
