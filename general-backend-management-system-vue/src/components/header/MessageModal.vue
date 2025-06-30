<template>
  <div style="display: flex; align-items: center">
    <Button type="link" :icon="h(MailOutlined)" class="open-modal-btn" @click="openModal" />
    <Modal v-model:open="modalVisible" title="部门消息" centered @ok="closeModal">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto facilis laborum
        mollitia necessitatibus odit officiis sunt ut vero, voluptatem voluptatibus! A aspernatur
        consectetur debitis fuga harum recusandae sint ullam vero!
      </div>

      <template #footer>
        <Flex justify="center">
          <Button type="primary" @click="closeModal">OK</Button>
        </Flex>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { MailOutlined } from '@ant-design/icons-vue';
import { Button, Flex, Modal } from 'ant-design-vue';
import { h, ref } from 'vue';

const modalVisible = ref(false);

function openModal() {
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
}
</script>

<style scoped lang="scss">
.open-modal-btn {
  font-size: 20px;
  padding: 0;
}
</style>
