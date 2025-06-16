<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div class="router-area">
    <router-link to="/" style="margin-right: 10px">{{ t('message.home') }}</router-link>
    <router-link to="/about">{{ t('message.about') }}</router-link>
    <router-view></router-view>
  </div>
  <div class="ant-area">
    <Button type="primary" :icon="h(SyncOutlined)" @click="switchLang">Antd Button</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { SyncOutlined } from '@ant-design/icons-vue';
import HelloWorld from './components/HelloWorld.vue';
import { h } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

function switchLang() {
  locale.value = locale.value === 'en' ? 'zh' : 'en';
}
</script>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

$bgc-router: #e2b050;
.router-area {
  margin-top: 20px;
  background-color: $bgc-router;
}
</style>
