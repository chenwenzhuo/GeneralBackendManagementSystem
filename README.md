# General Backend Management System

前后端分离的通用后台管理系统

## 项目结构

```
GeneralBackendManagementSystem/
├── general-backend-management-system-node/  # Node.js后端项目
├── frontend/                                 # 前端项目（待创建）
├── .gitignore
└── README.md
```

## 后端项目

后端项目位于 `general-backend-management-system-node/` 目录，使用 Node.js + Express 框架。

### 技术栈
- Node.js
- TypeScript
- Express
- CORS
- dotenv
- ESLint
- Prettier

### 目录结构
```
general-backend-management-system-node/
├── src/
│   ├── index.ts          # 入口文件
│   ├── routes/           # 路由
│   ├── controllers/      # 控制器
│   ├── middleware/       # 中间件
│   ├── models/           # 数据模型
│   ├── types/            # TypeScript类型定义
│   └── utils/            # 工具函数
├── dist/                 # 编译输出目录
├── .env.example          # 环境变量示例
├── .prettierrc           # Prettier配置
├── .prettierignore       # Prettier忽略配置
├── eslint.config.mjs     # ESLint配置
├── tsconfig.json         # TypeScript配置
├── nodemon.json          # 开发服务器配置
└── package.json
```

### 快速开始

1. 安装依赖：
```bash
cd general-backend-management-system-node
pnpm install
```

2. 配置环境变量：
```bash
cp .env.example .env
```

3. 开发模式（自动重启）：
```bash
pnpm run dev
```

4. 生产模式：
```bash
pnpm run build
pnpm start
```

服务将在 `http://localhost:3000` 启动。

### 可用脚本

- `pnpm run dev` - 开发模式，使用nodemon自动重启
- `pnpm run build` - 编译TypeScript代码
- `pnpm run type-check` - 类型检查，不生成文件
- `pnpm run lint` - 运行ESLint检查代码质量
- `pnpm run lint:fix` - 自动修复ESLint问题
- `pnpm run format` - 使用Prettier格式化代码
- `pnpm run format:check` - 检查代码格式
- `pnpm start` - 生产模式，运行编译后的代码

## 开发计划

- [ ] 创建前端项目
- [ ] 实现用户认证
- [ ] 实现权限管理
- [ ] 实现数据管理功能
