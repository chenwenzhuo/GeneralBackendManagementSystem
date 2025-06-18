import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置别名 "@" 指向 "src" 文件夹
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9257,
    open: false,
    cors: true,
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3007',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
