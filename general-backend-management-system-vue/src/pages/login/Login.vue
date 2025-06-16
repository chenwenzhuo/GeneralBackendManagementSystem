<template>
  <Layout style="height: 100%">
    <LayoutHeader :style="headerStyle">Header</LayoutHeader>
    <LayoutContent :style="contentStyle">Content</LayoutContent>
    <LayoutFooter :style="footerStyle">Footer</LayoutFooter>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, LayoutHeader, LayoutContent, LayoutFooter } from 'ant-design-vue';
import type { CSSProperties } from 'vue';

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
</script>

<style scoped></style>
