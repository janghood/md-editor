/*
 * @Author: 望海潮
 * @Date: 2021-07-24 13:07:51
 * @LastEditTime: 2021-07-28 23:32:44
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
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
    host: '0.0.0.0'
  },
})
