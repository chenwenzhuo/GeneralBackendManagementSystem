// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
  // 通用 JS / TS / Vue 处理
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended', 'plugin:prettier/recommended'], // 确保 Prettier 优先
    languageOptions: {
      globals: globals.browser,
    },
  },
  // TypeScript 推荐配置
  tseslint.configs.recommended, // 这里默认不需要单独加 prettier，因为第一块已经全局加了 plugin:prettier/recommended
  // Vue 单文件组件配置
  {
    files: ['**/*.vue'],
    plugins: { vue: pluginVue },
    extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'], // 确保 Prettier 优先
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser, // Vue 中 <script> 部分走 TS parser
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // 按需关闭单词组件名规则
    },
  },
  // JSON 文件
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  // CSS 文件
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
