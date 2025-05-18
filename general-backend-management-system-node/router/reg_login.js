// 登录注册模块路由
const express = require('express');
const loginHandler = require('../router_handler/reg_login');

// 使用 express 创建路由
const router = express.Router();

router.post('/register', loginHandler.register);
router.post('/login', loginHandler.login);

module.exports = router;