# 项目规范配置文档

本项目统一使用以下工具和配置来规范代码风格、提交格式，并提升协作效率：

| 依赖包名称                         | 作用                                 | 版本      |
| ---------------------------------- | ------------------------------------ | --------- |
| `@commitlint/cli`                  | Git 提交信息校验 CLI 工具            | `^19.8.1` |
| `@commitlint/config-conventional`  | 常用的 Commit 提交规范配置           | `^19.8.1` |
| `@typescript-eslint/eslint-plugin` | ESLint 的 TypeScript 插件            | `^5.62.0` |
| `@typescript-eslint/parser`        | ESLint 的 TypeScript 解析器          | `^5.62.0` |
| `eslint`                           | 代码语法检查工具                     | `^8.57.1` |
| `eslint-config-prettier`           | 关闭 ESLint 中与 Prettier 冲突的规则 | `^8.10.0` |
| `eslint-plugin-prettier`           | 在 ESLint 中运行 Prettier            | `^3.4.1`  |
| `eslint-plugin-vue`                | Vue 文件的 ESLint 插件               | `^9.33.0` |
| `husky`                            | Git Hooks 工具                       | `^8.0.3`  |
| `lint-staged`                      | Git 暂存文件检查工具                 | `^13.3.0` |
| `prettier`                         | 代码格式化工具                       | `^2.8.8`  |

---

## 📁 1. `.editorconfig`（统一缩进与换行）

```ini
# .editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

---

## 🔧 2. ESLint（语法与风格检查）

### 安装依赖

```bash
pnpm add -D eslint@8.57.1 @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier
```

### ESLint 配置 `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: 'espree',
      ts: '@typescript-eslint/parser',
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

---

## 🎨 3. Prettier（格式化工具）

### 安装依赖

```bash
pnpm add -D prettier@2.8.8 eslint-config-prettier eslint-plugin-prettier
```

### 配置 `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

### `.prettierignore`

```
node_modules
dist
coverage
*.log
```

---

## 🔐 4. Husky + lint-staged（提交前自动检查）

### 安装依赖

```bash
pnpm add -D husky@8.0.3 lint-staged
```

### 初始化 Husky

```bash
pnpm husky install
```

并在 `package.json` 中添加：

```json
"scripts": {
  "prepare": "husky install"
}
```

### 添加 pre-commit 钩子

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 在 `package.json` 添加 lint-staged 配置

```json
"lint-staged": {
  "**/*.{js,ts,vue}": ["eslint --fix"],
  "**/*.{js,ts,vue,json,css,md}": ["prettier --write"]
}
```

---

## 🧾 5. Commitlint（统一提交信息格式）

### 安装依赖

```bash
pnpm add -D @commitlint/{config-conventional,cli}
```

### 添加配置 `commitlint.config.cjs`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

### 添加 commit-msg 钩子

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

---

## ✅ 推荐 VSCode 插件设置（`.vscode/settings.json`）

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "vue"],
  "prettier.requireConfig": true
}
```

---

以上配置完成后，即可在整个项目中统一使用：

- `pnpm run lint`：检查代码风格
- `pnpm run lint:fix`：自动修复代码
- `pnpm run format`：格式化项目
- 提交代码时自动执行 ESLint + Prettier 校验

让团队协作更流畅，代码质量更稳定！
