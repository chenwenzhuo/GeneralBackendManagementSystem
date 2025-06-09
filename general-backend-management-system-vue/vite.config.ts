import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置别名 "@" 指向 "src" 文件夹
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
