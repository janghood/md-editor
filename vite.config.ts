/*
 * @Author: 望海潮
 * @Date: 2021-07-24 13:07:51
 * @LastEditTime: 2021-08-09 17:35:15
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { markdownPlugin } from './markdown-plugin';

export default defineConfig({
  plugins: [vue(), vueJsx(), markdownPlugin()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    terserOptions: {
      sourceMap: true,
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5678,
    proxy: {
      '/api': {
        target: 'http://192.168.3.159:8310',
        changeOrigin: true,
      },
      '/minio': {
        target: 'http://192.168.3.159:8310',
        changeOrigin: true,
      }
    }
  },
})
