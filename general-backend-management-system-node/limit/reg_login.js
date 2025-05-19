// 引入Joi数据验证库（用于定义数据验证规则）
const joi = require('joi');

// 定义账号验证规则
const account = joi
  .string()      // 必须是字符串类型
  .alphanum()    // 只能包含字母和数字
  .min(6)        // 最小长度6个字符
  .max(15)       // 最大长度15个字符
  .required();   // 必填字段

// 定义密码验证规则
const password = joi
  .string() // 必须是字符串类型
  .min(6) // 最小长度6个字符
  .max(15) // 最大长度15个字符
  .pattern(/^[a-zA-Z0-9]{6,15}$/) // 使用正则表达式验证格式，允许字母和数字组合，长度6-15位
  .required(); // 必填字段

module.exports = {
  // 表示对req.body里面的数据进行验证
  body: {account, password}
};