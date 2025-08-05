// 用户信息模块路由
const express = require('express');
const expressJoi = require('@escook/express-joi');
const userInfoHandler = require('../router_handler/user_info');
const userInfoLimit = require('../limit/user_info');

// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，主要用于上传文件
// Multer 不会处理任何非 multipart/form-data 类型的表单数据
const multer = require('multer');
// 在server服务端新建一个public文件夹，用于存放上传的文件
const upload = multer({ dest: 'public/upload' });

// 使用 express 创建路由
const router = express.Router();

router.post('/uploadAvatar', upload.single('avatar'), userInfoHandler.uploadAvatar);
router.post('/bindAccount', userInfoHandler.bindAccount);
router.get('/getUserInfo', userInfoHandler.getUserInfo);
router.put('/changeName', expressJoi(userInfoLimit.changeName), userInfoHandler.changeName);
router.put('/changeGender', expressJoi(userInfoLimit.changeGender), userInfoHandler.changeGender);
router.put('/changeEmail', expressJoi(userInfoLimit.changeEmail), userInfoHandler.changeEmail);

module.exports = router;
