# 创建项目

创建`app.js`文件，使用`express`创建基础应用模板。

安装`express`：

```bash
pnpm install express
```

创建`app.js`文件：

```javascript
const express = require('express');

const PORT = 3007;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!\n');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

# 解决跨域

安装`cors`：

```bash
pnpm install cors
```

挂载`cors`中间件：

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // 挂载CORS中间件
//...
```

# 解析表单数据

使用`body-parser`中间件解析表单数据。

安装`body-parser`：

```bash
pnpm install body-parser
```

挂载`body-parser`中间件：

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//...
```

其中，`bodyParser.urlencoded({extended: false})`用于解析`application/x-www-form-urlencoded`格式的数据，`bodyParser.json()`用于解析`application/json`格式的数据。

`extended`参数用于指定是否使用第三方库`qs`解析数据，默认为`false`，表示使用内置库`querystring`解析数据。

- `extended: false`：表示使用 `querystring` 库来解析请求体数据。解析后的对象是一个简单的键值对，不支持嵌套对象和数组。
- `extended: true`：表示使用 `qs` 库来解析请求体数据。解析后的对象支持嵌套对象和数组，功能更强大。

