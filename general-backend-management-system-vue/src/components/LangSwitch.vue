<template>
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
</template>

<script setup lang="ts">
import { TranslationOutlined } from '@ant-design/icons-vue';
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { h, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const dropdownVisible = ref(false);

function handleMenuClick(e: any) {
  locale.value = e.key;
  dropdownVisible.value = false;
}
</script>

<style scoped lang="scss"></style>
