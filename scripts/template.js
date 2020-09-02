/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件夹名` `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const pageName = process.argv[3];
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep [home] index');
  process.exit(0);
}
if (!pageName) {
  console.log('文件名称不能为空！');
  console.log('示例：npm run tep home [index]');
  process.exit(0);
}

const capPageName = titleCase(pageName);

// 页面模版
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './${pageName}.scss';

@connect(({${dirName}}) => ({
  ...${dirName},
}))

class ${capPageName} extends Component {
  config = {
    navigationBarTitleText: '${pageName}',
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='page'>
        ${pageName}
      </View>
    )
  }
}

export default ${capPageName};
`;

// scss文件模版
const scssTep = `@import "../../styles/mixin";

`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {
    demo: ''
  },

  effects: {
    * demo({ payload: values, token }, { call, put }) {
      const { data } = yield call(${dirName}Api.demo, values, token);

      yield put({
        type: 'save',
        payload: {
          demo: data.message.data.demo
        }
      });

    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
`;

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}
`

// service页面模版
const serviceTep = `import {syncAction} from '../../utils/request';

const TYPE = 'type'

export const demo = (data, token) => syncAction({
  method: '',
  type: TYPE,
  data,
  token
});
`;

// 判断文件夹是否创建，如果否则创建
if (!fs.existsSync(`./src/pages/${dirName}`)) {
  fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
}

process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${pageName}.js`, indexTep);
fs.writeFileSync(`${pageName}.scss`, scssTep);

// fs.statSync(`./src/pages/${dirName}/model.js`,function(err,stats){
//   if(err){
//     fs.writeFileSync('model.js', modelTep);
//   }
//   console.log('model文件已经存在未更新')
// })

if (!fs.existsSync(`./src/pages/${dirName}/model.js`)) {
  fs.writeFileSync('model.js', modelTep);
}else{
  console.log('model文件已经存在未更新')
}

if (!fs.existsSync(`./src/pages/${dirName}/config.js`)) {
  fs.writeFileSync('config.js', configTep);
}else{
  console.log('config文件已经存在未更新')
}

if (!fs.existsSync(`./src/pages/${dirName}/service.js`)) {
  fs.writeFileSync('service.js', serviceTep);
}else{
  console.log('service文件已经存在未更新')
}

console.log(`模版${dirName} ${pageName}已创建,请手动增加models`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
