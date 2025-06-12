## 🛠️ 团队协作建议文档：代码规范统一配置说明

为保证本项目代码风格一致，团队协作顺畅，特制定以下代码规范统一配置建议，建议团队成员统一配置 IDE 及工具链，避免代码风格冲突，提升代码质量。

---

### 📦 工具版本要求

| 工具                  | 推荐版本                   |
|---------------------|------------------------|
| ESLint              | ≥ 9.x                  |
| Prettier            | ≥ 3.5.x                |
| TypeScript          | ≥ 4.9                  |
| Vue                 | 3.x                    |
| Node.js             | ≥ 16.x                 |
| 包管理器（pnpm/yarn/npm） | 均可，推荐 pnpm 或 npm ≥ 9.x |

---

### 💻 编辑器配置建议

#### WebStorm 配置建议

- 打开 **Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint**
  - ✅ 勾选 **Run eslint --fix on save**
  - ✅ 选择 **Automatic ESLint Configuration** 或手动指定 `eslint.config.js`
- 打开 **Settings → Languages & Frameworks → Prettier**
  - ✅ 勾选 **On code reformat**
  - ✅ 勾选 **On save**
- 保证 `.editorconfig` 生效 → WebStorm 默认支持，无需额外配置

#### VSCode 配置建议

- 必装插件：
  - ESLint
  - Prettier - Code Formatter
- 推荐 VSCode `settings.json` 配置：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

### ⚙️ package.json 推荐 scripts 用法

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts,.vue .",
    "lint:fix": "eslint --ext .js,.ts,.vue --fix .",
    "format": "prettier --write \"**/*.{js,ts,vue,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,ts,vue,json,css,md}\"",
    "husky:init": "git config core.hooksPath .husky"
  }
}
```

---

### 🚀 Git Hook 自动代码规范检查（适配 Husky 9.x 最新用法）

本项目使用 **Husky 9.x + lint-staged** 配置 Git Hook，提交前自动进行代码质量检查和格式化，保证主分支代码质量。

#### 使用流程：

1️⃣ clone 项目后，首次安装依赖：

```bash
npm install
```

2️⃣ 初始化 Git hooks path：

```bash
npm run husky:init
```

> 必须执行一次此命令，设置 `core.hooksPath`，否则 `.husky` 目录不会生效。

3️⃣ 添加 commit 时自动运行：

- **eslint --fix** → 自动修复代码问题
- **prettier --write** → 自动统一代码风格

#### lint-staged 配置：

```json
{
  "lint-staged": {
    "**/*.{js,ts,vue}": [
      "eslint --fix"
    ],
    "**/*.{js,ts,vue,json,css,md}": [
      "prettier --write"
    ]
  }
}
```

#### .husky/pre-commit 文件示例：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

#### 注意事项：

- 如果提交时报错，请先执行：

```bash
npm run lint:fix && npm run format
```

- 不建议跳过 Git Hook，保证代码质量。
- 若团队成员新 clone 项目，需提示执行一次：

```bash
npm run husky:init
```

---

### 🚦 代码提交前建议

- 本地手动执行：

```bash
npm run lint && npm run format:check
```

- CI / Git Hooks 会自动跑 ESLint + Prettier 检查，保障主分支代码规范。

---

### ❓ 常见问题 FAQ

**Q: 为什么不用 ESLint 的格式规则，全部交给 Prettier？**  
A: 避免 ESLint 和 Prettier 打架，保持格式唯一性，Prettier 处理格式速度更快且规则更稳定。

**Q: 为什么 Vue 配置里也加了 `plugin:prettier/recommended`？**  
A: Vue SFC 文件的 template 部分空格、缩进、属性换行等也需统一交由 Prettier 处理，避免与 `eslint-plugin-vue` 冲突。

**Q: WebStorm 格式化快捷键如何使用？**  
A: 默认 **Cmd + Option + L** / **Ctrl + Alt + L**，配置 Prettier On Save 后，直接保存文件即可自动格式化。

**Q: Prettier 和 ESLint 配置发生冲突时如何排查？**  
A: 确认 `eslint.config.js` 中是否启用了 `plugin:prettier/recommended`，此配置会自动关闭 ESLint 格式规则，避免冲突。不要手动重复设置
`quotes`、`semi`、`indent` 等规则。

**Q: 为什么 Husky 9.x 不用 prepare + husky install？**  
A: Husky 9.x 官方废弃 `husky install`，推荐直接用 `.husky` 目录 + `core.hooksPath`，更简单、更兼容 Git 自身 hooks 机制。

---

### 🏆 最终效果

✅ 代码格式统一，避免格式争议  
✅ ESLint 只负责代码质量，Prettier 负责代码格式  
✅ IDE 保存自动修复，提升开发效率  
✅ Git Hooks 提交自动检测，防止不规范代码进入主分支  
✅ CI 校验，保障主分支代码质量

---
