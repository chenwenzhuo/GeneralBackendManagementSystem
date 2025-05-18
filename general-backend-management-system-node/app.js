const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); // 挂载CORS中间件
// 挂载body-parser中间件
app.use(bodyParser.urlencoded({extended: false})); // 解析application/x-www-form-urlencoded格式的请求体数据
app.use(bodyParser.json()); // 解析application/json格式的请求体数据

// 在进行路由之前，在res上定义一个自定义的响应函数cc，用于返回错误信息
app.use((req, res, next) => {
  // status为0表示成功，为1表示失败
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  };
  next();
});

const loginRouter = require('./router/reg_login');
app.use('/api', loginRouter);

const jwtConfig = require('./jwt_config');
const {expressjwt} = require('express-jwt');
app.use(
  expressjwt({
    secret: jwtConfig.jwtSecret,
    algorithms: ['HS256']
  })
    .unless({path: [/^\/api\//]})
);

app.get('/', (req, res) => {
  res.send('Hello World!!!\n');
});

// 侦听指定端口
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
