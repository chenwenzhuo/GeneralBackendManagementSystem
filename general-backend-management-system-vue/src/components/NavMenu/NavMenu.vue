<template>
  <Menu
    v-model:selected-keys="state.selectedKeys"
    :open-keys="state.openKeys"
    :items="items"
    mode="inline"
    theme="dark"
    class="nav-menu"
    @open-change="onOpenChange"
  ></Menu>
</template>

<script setup lang="ts">
import type { ItemType } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { useNavMenu } from '@/components/NavMenu/useNavMenu';

const { t } = useI18n();
const { navMenuConfig } = useNavMenu();

const items: ItemType[] = reactive(cloneDeep(navMenuConfig));
const state = reactive({
  rootSubmenuKeys: ['userManage', 'productManage', 'msgManage'],
  openKeys: [],
  selectedKeys: ['home'],
});

const onOpenChange: any = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
</script>

<style scoped lang="scss">
.nav-menu {
  width: 100%;
  height: 100%;
}
</style>
