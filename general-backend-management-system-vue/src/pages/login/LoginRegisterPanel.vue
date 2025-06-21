<template>
  <Card class="panel-container">
    <Tabs v-model:active-key="activeTabKey" centered size="large" @change="onTabsChange">
      <TabPane key="login" :tab="t('login.content.login')"></TabPane>
      <TabPane key="register" :tab="t('login.content.register')"></TabPane>
    </Tabs>
    <LoginRegisterForm
      ref="loginRegFormRef"
      :form-type="activeTabKey"
      class="login-reg-form"
      @switch-reg="switchToRegister"
    />
  </Card>
</template>

<script setup lang="ts">
import { Card, TabPane, Tabs } from 'ant-design-vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { LoginRegisterFormType } from '@/pages/login/LoginRegisterForm.vue';
import LoginRegisterForm from '@/pages/login/LoginRegisterForm.vue';

const { t } = useI18n();
const activeTabKey = ref<LoginRegisterFormType>('login');
const loginRegFormRef = ref(null);

function switchToRegister() {
  onTabsChange();
  activeTabKey.value = 'register';
}

function onTabsChange() {
  loginRegFormRef.value?.resetForm();
}
</script>

<style scoped lang="scss">
.panel-container {
  width: 400px;
  background-color: #fff;

  .login-reg-form {
    margin-top: 10px;
  }
}

:deep(.ant-tabs-nav-list) {
  width: 100%;

  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .ant-tabs-ink-bar {
    width: 50%;
  }
}
</style>
