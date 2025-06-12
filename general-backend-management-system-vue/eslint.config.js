// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
  // 通用 JS / TS / Vue 处理
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // TypeScript 推荐配置
  tseslint.configs.recommended,
  // TypeScript自定义配置
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Vue 单文件组件配置
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
      prettier: pluginPrettier,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
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
      // Prettier 规则
      'prettier/prettier': 'error',
      // 额外自定义规则
      'vue/multi-word-component-names': 'off',
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
    rules: {
      'css/use-baseline': 'off',
    },
  },
]);
