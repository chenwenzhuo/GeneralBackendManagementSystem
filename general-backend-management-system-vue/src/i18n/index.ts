import { createI18n } from 'vue-i18n';

import en from './en';
import zh from './zh';

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  globalInjection: true, // 全局注入 $t
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages: {
    zh,
    en,
  },
});

export default i18n;
