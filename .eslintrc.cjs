module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
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
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 注意：这将关闭 ESLint 中的格式类规则，由 Prettier 接管
  ],
  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts', '*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any': 'off', // 加上这一行
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
  rules: {
    // 通用规则
    'no-unused-vars': 'off', // 由 TS 接管
    'no-console': 'off',
    'no-debugger': 'warn',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',

    // Vue 相关
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',

    // TypeScript 相关
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
