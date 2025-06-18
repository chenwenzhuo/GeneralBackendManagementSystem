<template>
  <Layout class="login-layout">
    <LayoutHeader class="login-header">
      <div class="header-content">
        <h1 class="header-title">{{ t('login.header.title') }}</h1>
        <div class="header-shortcuts">
          <div class="welcome">{{ t('login.header.welcome') }}</div>
          <LangSwitch />
        </div>
      </div>
    </LayoutHeader>
    <LayoutContent class="login-body"></LayoutContent>
    <LayoutFooter class="login-footer">
      <div class="footer-content">
        <ul class="footer-techs">
          <li v-for="(tech, index) in footerText.techs" :key="index">{{ tech }}</li>
        </ul>
        <ul class="footer-copyright">
          <li v-for="(cr, index) in footerText.copyright" :key="index">{{ cr }}</li>
        </ul>
      </div>
    </LayoutFooter>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from 'ant-design-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import LangSwitch from '@/components/LangSwitch.vue';

const { t } = useI18n();

const footerText = computed(() => ({
  techs: [
    t('login.footer.devMode'),
    t('login.footer.vue'),
    t('login.footer.vueRouter'),
    t('login.footer.nodejs'),
    t('login.footer.antdVue'),
  ],
  copyright: [t('login.footer.copyright')],
}));
</script>

<style scoped lang="scss">
$content-width: 1200px;

@mixin login-content {
  width: $content-width;
  height: 100%;
  margin: 0 auto;
  color: #1e1e1e;
}

.login-layout {
  height: 100%;

  .login-header {
    height: 64px;

    .header-content {
      @include login-content;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-shortcuts {
        display: flex;
        align-items: center;
      }
    }
  }

  :deep(.ant-layout-header) {
    background-color: inherit;
  }

  .login-body {
    background-image: url('@/assets/code.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .login-footer {
    height: 64px;

    .footer-content {
      @include login-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .footer-techs {
        display: flex;

        li {
          display: flex;
          align-items: center;

          &:not(:last-child)::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 70%;
            margin: 0 8px;
            background-color: #1e1e1e;
          }
        }
      }
    }
  }
}
</style>
