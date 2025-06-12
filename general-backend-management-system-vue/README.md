# Vue 3 + TypeScript + Vite

## 🛠️ 团队协作建议文档：代码规范统一配置说明

为保证本项目代码风格一致，团队协作顺畅，特制定以下代码规范统一配置建议，建议团队成员统一配置 IDE 及工具链，避免代码风格冲突，提升代码质量。

### 📦 工具版本要求

| 工具         | 推荐版本 |
|--------------|---------|
| ESLint       | ≥ 9.x   |
| Prettier     | ≥ 3.5.x |
| TypeScript   | ≥ 4.9   |
| Vue          | 3.x     |
| Node.js      | ≥ 16.x  |
| 包管理器（pnpm/yarn/npm） | 均可，推荐 pnpm 或 npm ≥ 9.x |

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

### ⚙️ package.json 推荐 scripts

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts,.vue .",
    "lint:fix": "eslint --ext .js,.ts,.vue --fix .",
    "format": "prettier --write \"**/*.{js,ts,vue,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,ts,vue,json,css,md}\""
  }
}
```
