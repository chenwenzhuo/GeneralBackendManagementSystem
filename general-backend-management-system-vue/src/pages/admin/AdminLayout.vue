<template>
  <Layout class="admin-layout">
    <LayoutSider class="admin-layout-sider">
      <h1 class="title">{{ t('message.title') }}</h1>
      <div class="menu-container">
        <NavMenu />
      </div>
    </LayoutSider>
    <Layout class="admin-layout-main">
      <LayoutHeader class="admin-layout-header">layout header</LayoutHeader>
      <LayoutContent class="admin-layout-content">
        <main class="admin-content">
          <RouterView />
        </main>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, LayoutContent, LayoutHeader, LayoutSider } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import NavMenu from '@/components/nav-menu/NavMenu.vue';

const { t, locale } = useI18n();
</script>

<style scoped lang="scss">
.admin-layout {
  height: 100%;

  .admin-layout-sider {
    .title {
      width: 100%;
      height: 64px;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px solid #b6b6b6;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu-container {
      width: 100%;
      height: calc(100% - 64px);
    }
  }

  .admin-layout-main {
    :deep(.ant-layout-header) {
      background-color: inherit;
    }

    .admin-layout-content {
      padding: 10px 15px;
      background-color: #e8e8e8;

      .admin-content {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 5px;
        padding: 0;
      }
    }
  }
}
</style>
