// 引入Joi数据验证库（用于定义数据验证规则）
const joi = require('joi');

// 定义id验证规则
const id = joi
  .number() // 必须是数字类型
  .required(); // 必填字段

// 定义姓名验证规则
const name = joi
  .string() // 必须是字符串类型
  .required() // 必填字段
  // 姓名格式：中文（2-20个字符）或英文（2-50个字符，允许空格、点、单引号、破折号）
  .pattern(/^[\u4e00-\u9fa5·]{2,20}$|^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/);

// 定义性别验证规则
const gender = joi
  .string() // 必须是字符串类型
  .pattern(/^(male|female)$/i) // 只能是male或female，不区分大小写
  .required(); // 必填字段

// 定义邮箱验证规则
const email = joi
  .string() // 必须是字符串类型
  .email() // 验证邮箱格式
  .required(); // 必填字段

module.exports = {
  // 表示对req.body里面的数据进行验证
  changeName: { body: { id, name } },
  changeGender: { body: { id, gender } },
  changeEmail: { body: { id, email } },
};
