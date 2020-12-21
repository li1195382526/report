import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

const AnswerSubList = ({subList=[]}) => (
  <View>
    {subList.map((sub, key) => (
      <View className="qtn_warn" key={key}>
        <View className="qtn__title">{utils.strip(sub.subDescn)}</View>
        {sub.optList.map((opt, key) => (
          <ul key={key}>
            <li
              className="qtn__opt"
              dangerouslySetInnerHTML={{__html: utils.strip(opt.label)}}
            />
            <li className="qtn__opt">
              {opt.text ? '（ ' + opt.text + ' ）' : ''}
            </li>
          </ul>
        ))}
      </View>
    ))}
  </View>
)

export default AnswerSubList
