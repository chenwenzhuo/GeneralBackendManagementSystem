const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); // 挂载CORS中间件
// 挂载body-parser中间件
app.use(bodyParser.urlencoded({extended: false})); // 解析application/x-www-form-urlencoded格式的请求体数据
app.use(bodyParser.json()); // 解析application/json格式的请求体数据

app.get('/', (req, res) => {
  res.send('Hello World!!!\n');
});

// 侦听指定端口
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
