const db = require('../db');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../jwt_config');

/**
 * 用户注册函数
 *
 * 该函数处理用户注册请求，验证账号和密码是否为空，检查账号是否已存在，
 * 如果账号不存在，则将用户信息插入数据库并返回注册结果。
 *
 * @param {Object} req - 请求对象，包含用户提交的注册信息
 * @param {Object} res - 响应对象，用于返回注册结果
 */
const register = (req, res) => {
  // 从请求体中获取用户提交的注册信息
  const regInfo = req.body;

  // 检查账号和密码是否为空，如果为空则返回错误信息
  if (!regInfo?.account || !regInfo?.password) {
    return res.send({ status: 1, message: '账号和密码不能为空' });
  }

  // 查询数据库中是否已存在该账号
  const sqlStr_checkAcc = 'select * from users where account = ?';
  db.query(sqlStr_checkAcc, regInfo.account)
    .then((results) => {
      // 如果查询结果不为空，说明账号已存在，返回错误信息
      if (results[0].length !== 0) {
        return res.send({ status: 1, message: '账号已存在' });
      }

      // 账号不存在，对密码进行加密处理
      const encryptedPwd = bcrypt.hashSync(regInfo.password, 10);
      const identity = '用户';
      const create_time = new Date();

      // 将用户信息插入数据库
      const sqlStr_insert = 'insert into users set ?';
      db.query(sqlStr_insert, {
        account: regInfo.account,
        password: encryptedPwd,
        identity,
        create_time,
        status: 0,
      }).then((results) => {
        // 检查插入操作是否成功，如果影响行数不为1，则返回注册失败信息
        if (results[0].affectedRows !== 1) {
          return res.send({ status: 1, message: '注册失败，请稍后再试！' });
        }
        // 注册成功，返回成功信息
        res.send({ status: 0, message: '注册成功' });
      });
    })
    .catch((err) => {
      // 捕获并处理数据库查询或插入过程中出现的错误
      console.log(err);
      res.cc(err);
    });
};

/**
 * 处理用户登录请求
 *
 * @param {Object} req - 请求对象，包含用户提交的登录信息
 * @param {Object} res - 响应对象，用于返回处理结果
 */
const login = (req, res) => {
  const loginInfo = req.body;

  // 检查账号和密码是否为空
  if (!loginInfo?.account || !loginInfo?.password) {
    return res.send({ status: 1, message: '账号和密码不能为空' });
  }

  // 查询数据库中是否存在该账号
  const sqlStr_checkAcc = 'select * from users where account = ?';
  db.query(sqlStr_checkAcc, loginInfo.account)
    .then((results) => {
      // 检查账号是否存在
      if (results[0].length !== 1) {
        return res.send({ status: 1, message: '账号不存在' });
      }

      // 验证密码是否正确
      const compareResult = bcrypt.compareSync(loginInfo.password, results[0][0].password);
      if (!compareResult) {
        return res.send({ status: 1, message: '账号或密码错误' });
      }

      // 检查账号是否被冻结
      if (results[0].status === 1) {
        return res.send({ status: 1, message: '账号已冻结' });
      }

      // 生成用户信息并去除敏感字段
      const userInfo = _.omit(_.cloneDeep(results[0][0]), [
        'password',
        'img_url',
        'create_time',
        'update_time',
      ]);

      // 生成JWT token并返回登录成功信息
      const tokenStr = jwt.sign(userInfo, jwtConfig.jwtSecret, { expiresIn: '24h' });
      res.send({
        status: 0,
        message: '登录成功',
        token: 'Bearer ' + tokenStr,
        userInfo,
      });
    })
    .catch((err) => {
      // 捕获并处理数据库查询错误
      console.log(err);
      res.cc(err);
    });
};

module.exports = {
  register,
  login,
};
