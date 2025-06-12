import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import css from "@eslint/css";
import {defineConfig} from "eslint/config";
import vueParser from "vue-eslint-parser";  // <-- 导入 vue-eslint-parser 模块

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: {js},
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        languageOptions: {
            globals: globals.browser,
        },
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.vue"],
        plugins: {vue: pluginVue},
        languageOptions: {
            parser: vueParser,   // 这里传入解析器对象
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },
        rules: {
            "vue/multi-word-component-names": "off", // 示例规则
        }
    },
    {
        files: ["**/*.json"],
        plugins: {json},
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.css"],
        plugins: {css},
        language: "css/css",
        extends: ["css/recommended"],
    },
]);