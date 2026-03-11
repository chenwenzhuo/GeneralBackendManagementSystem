# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 技术栈

- React 19
- TypeScript
- Vite
- ESLint
- Prettier
- React Compiler

## 快速开始

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm run dev
```

3. 构建生产版本：
```bash
pnpm run build
```

## 可用脚本

- `pnpm run dev` - 启动开发服务器
- `pnpm run build` - 构建生产版本
- `pnpm run lint` - 运行ESLint检查代码质量
- `pnpm run lint:fix` - 自动修复ESLint问题
- `pnpm run format` - 使用Prettier格式化代码
- `pnpm run format:check` - 检查代码格式
- `pnpm run preview` - 预览生产构建

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## 代码质量工具

### ESLint

项目使用ESLint进行代码质量检查，配置包括：
- TypeScript推荐规则
- React Hooks规则
- React Refresh规则
- Prettier集成
- 自定义规则（未使用变量检查、Promise错误检查等）

### Prettier

项目使用Prettier进行代码格式化，配置包括：
- 使用分号
- 单引号
- 2空格缩进
- 行宽100字符
- ES5尾随逗号
- LF换行符

## 配置文件

- `eslint.config.mjs` - ESLint配置
- `.prettierrc` - Prettier配置
- `.prettierignore` - Prettier忽略文件
- `tsconfig.json` - TypeScript配置
- `vite.config.ts` - Vite配置
