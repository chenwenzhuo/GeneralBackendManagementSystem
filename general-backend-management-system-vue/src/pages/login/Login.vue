<template>
  <Layout class="login-layout">
    <LayoutHeader class="login-header">
      <div class="header-content">
        <h1 class="header-title">{{ t('login.header.title') }}</h1>
        <div class="header-shortcuts">
          <div class="welcome">{{ t('login.header.welcome') }}</div>
          <Dropdown v-model:open="dropdownVisible">
            <Button type="link" :icon="h(TranslationOutlined)">
              {{ t('login.header.switchLang') }}
            </Button>

            <template #overlay>
              <Menu @click="handleMenuClick">
                <MenuItem key="zh">简体中文</MenuItem>
                <MenuItem key="en">English</MenuItem>
              </Menu>
            </template>
          </Dropdown>
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
import { TranslationOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Dropdown,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Menu,
  MenuItem,
} from 'ant-design-vue';
import { computed, h, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const dropdownVisible = ref(false);

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

function handleMenuClick(e: any) {
  locale.value = e.key;
  dropdownVisible.value = false;
}
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
