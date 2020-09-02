/**
 * pages页面快速生成脚本 
 * 用法：npm run com `文件名`
 * author: lucky
 * date: 2020.3.3
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = titleCase(dirName);
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class ${capPirName} extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
      <View className='${dirName}-wrap'>
      </View>
    )
  }
}

export default ${capPirName}
`

// scss文件模版
const scssTep = `@import "../../styles/base.scss";

.${dirName}-wrap {
  width: 100%;
}
`
// 判断文件夹是否创建，如果否则创建
if (!fs.existsSync(`./src/components/${dirName}`)) {
  fs.mkdirSync(`./src/components/${dirName}`); // mkdir $1
}
process.chdir(`./src/components/${dirName}`); // cd $1

fs.writeFileSync(`index.js`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss


console.log(`组件${dirName}已创建`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
