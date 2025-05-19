// 登录注册模块路由
const express = require('express');
const expressJoi = require('@escook/express-joi');
const loginHandler = require('../router_handler/reg_login');
const reg_login_limit = require('../limit/reg_login');

// 使用 express 创建路由
const router = express.Router();

router.post('/register', expressJoi(reg_login_limit), loginHandler.register);
router.post('/login', expressJoi(reg_login_limit), loginHandler.login);

module.exports = router;