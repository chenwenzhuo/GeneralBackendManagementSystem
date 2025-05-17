const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // 挂载CORS中间件

app.get('/', (req, res) => {
  res.send('Hello World!!!\n');
});

// 侦听指定端口
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
