/**
 * 答题时的验证
 */
import { fromJS } from "immutable";


/**
 * @param questions List
 * @param anw Map
 * @return {{pass: boolean, message: string}}
 */
function validateMultiChoice(questions, anw) {
  let pass = true;
  let message = "";
  questions.map(question => {
    //if(question.get('flag') && question.get('newGotoFlag')) {
    const type = question.get("type");
    const selectType = question.get("selectType");
    const isMultiChoice = type === 1 && [1, 10, 12].indexOf(selectType) > -1;

    const max = question.get("optlist").size;
    let smin = question.get("smin");
    if (smin < 1 || smin > max) {
      smin = 1;
    }

    // 设置了非必填时，不检查smin和smax
    if (!question.get("required") && !question.get("deleted")) {
      return;
    }
    if (pass && isMultiChoice && !question.get("deleted")) {
      const mySeq = question.get("mySeq");
      const current = anw.has(mySeq) ? anw.get(mySeq).size : 0;

      if (current < smin) {
        pass = false;
        message = 'i18n.messageForPrompt.hot_least_answers.format(mySeq, smin)';
      }
    }
    // }
  });
  return { pass, message };
}


/**
 * 检测填空题必填项和格式
 * @opts List
 */
function validateOpen(answers, opts, qtSeq, selectType,question) {
  let pass = true;
  let message = "";
  opts.map(opt => {
    const premise = `${qtSeq}(${opt.get("mySeq")})`;
    const optAnw = answers.find(item => item.indexOf(premise) === 0);
    var an = '答案' // 填空答案
    if(optAnw) an = optAnw.split('_')[1]
    const required = !!question.get("required") || false;
    if (required && (optAnw === undefined || !an) && (selectType === 1 || selectType === 7)) {
      pass = false;
      message = `${qtSeq}必须填写`;
    } else if (pass && required && optAnw === undefined && selectType === 2) {
      pass = false;
      message = 'i18n.messageForPrompt.open_multiple_require_answers.format'
       
    }else if(required && !!optAnw && selectType === 7){
        const value = Number(optAnw.split("_")[1])
        if(!(typeof value === 'number' && !isNaN(value))){
            pass = false;
            message = `${qtSeq}必须填写数字`;
        }    
    }
  });
  return { pass, message };
}


/**
 * @param questions List
 * @param anw Map
 * @return {{pass: boolean, message: string}}
 */
// eslint-disable-next-line import/prefer-default-export
export function validate(questions, anw) {
  let pass = true;
  let message = "";
  //必答题检测
  const filterFunc = item => item.length > 0;
  questions.map(question => {
    const mySeq = question.get("mySeq");
    const answers = anw.get(mySeq)
      ? anw.get(mySeq).filter(filterFunc)
      : fromJS([]);
    const hasAnswer = answers.size > 0;
    const opts = question.get("optlist");
    const type = question.get("type");
    const selectType = question.get("selectType");
    const isMatrix = type === 3;
    const isMultiScore = type === 8 && selectType === 4;
    const isSort = type === 4;
    const isRequired = question.get("required");

    if (
      type !== 6 && // 过渡题不需要检查
      type !== 2 && // 填空题的required只在选项中生效
      !isMatrix && // 矩阵题的required在后面处理
      !isMultiScore && // 多项打分题的required在后面处理
      pass &&
      isRequired &&
      !hasAnswer &&
      !question.get("deleted") // 引用所生成子问卷是不已删除
    ) {
      pass = false;
      message = `${question.get("mySeq")}必答`
    }
    
    //开放题选项为必填时，需要检测
    const isOpen = type === 2;
    if (pass && isOpen && !question.get("deleted")) {
      const result = validateOpen(answers, opts, mySeq, selectType,question);
      if (!result.pass) {
        pass = false;
        message = result.message;
      }
    }
  });

  if (pass) {
    // check smin and smax
    return validateMultiChoice(questions, anw);
  }

  return { pass, message };
}
