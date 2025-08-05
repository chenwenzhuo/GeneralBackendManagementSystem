const db = require('../db');
const crypto = require('node:crypto');
const fs = require('fs');

/**
 * 上传用户头像并保存到服务器和数据库
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @returns {void} 无返回值，通过res.send发送响应
 */
const uploadAvatar = (req, res) => {
  // 检查是否有上传文件
  if (!req.file) {
    return res.cc('没有上传文件');
  }
  console.log(req.file);

  const onlyId = crypto.randomUUID(); // 生成唯一ID用于文件名避免冲突
  const oldName = req.file.filename; // 获取上传文件的临时文件名
  // 处理原始文件名，在文件名中插入唯一ID
  const newName = Buffer.from(
    req.file.originalname
      .split('.')
      .map((item, index, arr) => {
        // 在倒数第二个部分添加唯一ID
        if (index === arr.length - 2) {
          return `${item}_${onlyId}`;
        }
        return item;
      })
      .join('.'),
    'latin1',
  ) // 处理文件名编码问题
    .toString('utf8');
  // 将临时文件重命名并移动到上传目录
  fs.renameSync(`public/upload/${oldName}`, `public/upload/${newName}`);

  // 准备SQL语句，将图片信息插入数据库
  const sql = 'insert into images set ?';
  // 执行SQL插入操作
  db.query(sql, { image_url: `http://127.0.0.1:3007/upload/${newName}`, only_id: onlyId }).then(
    (results) => {
      // 检查数据库操作是否成功
      if (results[0].affectedRows !== 1) {
        return res.send({ status: 1, message: '上传失败，请稍后再试！' });
      }

      // 上传成功，返回包含图片信息的响应
      res.send({
        onlyId,
        status: 0,
        message: '上传成功',
        url: `http://127.0.0.1:3007/upload/${newName}`,
      });
    },
  );
};

/**
 * 绑定用户账号与头像信息
 * @param {Object} req - Express请求对象，包含绑定所需的账号和头像信息
 * @param {Object} res - Express响应对象，用于返回绑定结果
 * @returns {Promise<void>} 无返回值，通过res.send发送响应
 */
const bindAccount = async (req, res) => {
  const { account, only_id, url } = req.body; // 从请求体中获取账号、头像唯一ID和头像URL
  const imageSql = 'update images set account = ? where only_id = ?'; // 定义更新images表的SQL语句，将账号与头像关联
  const userSql = 'update users set image_url = ? where account = ?'; // 定义更新users表的SQL语句，设置用户头像URL
  // 获取数据库连接
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction(); // 开始数据库事务
    // 并行执行两个更新操作
    const [imageResults, userResults] = await Promise.all([
      db.query(imageSql, [account, only_id]),
      db.query(userSql, [url, account]),
    ]);

    // 检查两个更新操作是否都成功影响了一行数据
    if (imageResults[0].affectedRows === 1 && userResults[0].affectedRows === 1) {
      await conn.commit(); // 事务提交
      res.send({ status: 0, message: '绑定成功' });
    } else {
      // 事务回滚（任一更新失败）
      await conn.rollback();
      res.send({ status: 1, message: '绑定失败，请稍后再试！' });
    }
  } catch (err) {
    // 捕获异常并回滚事务
    console.error('出现错误，回滚事务:', err.message);
    await conn.rollback();
    res.send({ status: 1, message: '绑定失败，请稍后再试！' });
  }
};

/**
 * 获取用户信息
 * @param {Object} req - Express请求对象，包含用户账号
 * @param {Object} res - Express响应对象，用于返回用户信息
 * @returns {Promise<void>} 无返回值，通过res.send发送响应
 */
const getUserInfo = async (req, res) => {
  const sql = 'select * from users where id = ?';
  const results = await db.query(sql, req.query.id);

  console.log('用户信息---', results);
  if (results[0].length !== 1) {
    return res.send({ status: 1, message: '获取用户信息失败' });
  } else {
    res.send({ status: 0, message: '获取用户信息成功', data: results[0][0] });
  }
};

/**
 * 修改用户名称
 * @param {Object} req - Express请求对象，包含用户ID和新名称
 * @param {Object} res - Express响应对象，用于返回操作结果
 * @returns {Promise<void>} 无返回值，通过res.send发送响应
 */
const changeName = async (req, res) => {
  const { id, name } = req.body;
  const sql = 'update users set name = ? where id = ?';

  const conn = await db.getConnection(); // 获取数据库连接
  try {
    await conn.beginTransaction(); // 开始数据库事务

    const results = await db.query(sql, [name, id]);
    console.log('修改用户名---', results);

    if (results[0].affectedRows !== 1) {
      await conn.rollback(); // 回滚事务
      return res.send({ status: 1, message: '修改用户名失败' });
    } else {
      await conn.commit(); // 提交事务
      return res.send({ status: 0, message: '修改用户名成功' });
    }
  } catch (e) {
    console.error('出现错误，回滚事务:', e.message);
    await conn.rollback(); // 回滚事务
    return res.send({ status: 1, message: '修改用户名失败' });
  }
};

/**
 * 修改用户性别
 * @param {Object} req - Express请求对象，包含用户ID和新性别
 * @param {Object} res - Express响应对象，用于返回操作结果
 * @returns {Promise<void>} 无返回值，通过res.send发送响应
 */
const changeGender = async (req, res) => {
  const { id, gender } = req.body;
  const sql = 'update users set gender = ? where id = ?';

  const conn = await db.getConnection(); // 获取数据库连接
  try {
    await conn.beginTransaction(); // 开始数据库事务

    const results = await db.query(sql, [gender, id]);
    console.log('修改用户性别---', results);

    if (results[0].affectedRows !== 1) {
      await conn.rollback(); // 回滚事务
      return res.send({ status: 1, message: '修改用户性别失败' });
    } else {
      await conn.commit(); // 提交事务
      return res.send({ status: 0, message: '修改用户性别成功' });
    }
  } catch (e) {
    console.error('出现错误，回滚事务:', e.message);
    await conn.rollback(); // 回滚事务
    return res.send({ status: 1, message: '修改用户性别失败' });
  }
};

/**
 * 修改用户邮箱
 * @param {Object} req - Express请求对象，包含用户ID和新邮箱
 * @param {Object} res - Express响应对象，用于返回操作结果
 * @returns {Promise<void>} 无返回值，通过res.send发送响应
 */
const changeEmail = async (req, res) => {
  const { id, email } = req.body;
  const sql = 'update users set email = ? where id = ?';

  const conn = await db.getConnection(); // 获取数据库连接
  try {
    await conn.beginTransaction(); // 开始数据库事务

    const results = await db.query(sql, [email, id]);
    console.log('修改用户邮箱---', results);

    if (results[0].affectedRows !== 1) {
      await conn.rollback(); // 回滚事务
      return res.send({ status: 1, message: '修改用户邮箱失败' });
    } else {
      await conn.commit(); // 提交事务
      return res.send({ status: 0, message: '修改用户邮箱成功' });
    }
  } catch (e) {
    console.error('出现错误，回滚事务:', e.message);
    await conn.rollback();
    return res.send({ status: 1, message: '修改用户邮箱失败' });
  }
};

module.exports = { uploadAvatar, bindAccount, getUserInfo, changeName, changeGender, changeEmail };
