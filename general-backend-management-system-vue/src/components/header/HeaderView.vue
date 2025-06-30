<template>
  <Flex align="center" class="heder-flex-wrapper">
    <div class="header-welcome-text">欢迎登录</div>

    <Avatar src="https://picsum.photos/200" alt="avatar" />
    <MessageModal class="msg-modal" />
    <Dropdown placement="bottomRight">
      <Button type="link" :icon="h(SettingOutlined)" class="setting-icon-btn" />
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
import { Avatar, Button, Dropdown, Flex, Menu, MenuItem } from 'ant-design-vue';
import { h } from 'vue';

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

  .msg-modal {
    margin: 0 20px;
  }

  .setting-icon-btn {
    font-size: 20px;
    padding: 0;
  }
}
</style>
