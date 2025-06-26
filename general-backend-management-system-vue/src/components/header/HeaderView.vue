<template>
  <Flex align="center" class="heder-flex-wrapper">
    <div class="header-welcome-text">欢迎登录</div>
    <MessageModal />
    <Avatar src="https://picsum.photos/200" class="header-avatar" alt="avatar" />
    <Dropdown placement="bottomRight">
      <SettingOutlined />

      <template #overlay>
        <Menu>
          <MenuItem>
            <a href="javascript:">1st menu item</a>
          </MenuItem>
          <MenuItem>
            <a href="javascript:">2nd menu item</a>
          </MenuItem>
          <MenuItem>
            <a href="javascript:">3rd menu item</a>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </Flex>
</template>

<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue';
import { Avatar, Dropdown, Flex, Menu, MenuItem } from 'ant-design-vue';

import MessageModal from '@/components/header/MessageModal.vue';
</script>

<style scoped lang="scss">
.heder-flex-wrapper {
  width: 100%;
  height: 100%;
  padding-right: 30px;

  .header-welcome-text {
    margin-right: auto;
  }

  .header-avatar {
    margin: 0 20px;
  }
}
</style>
