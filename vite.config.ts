/*
 * @Author: 望海潮
 * @Date: 2021-07-24 13:07:51
 * @LastEditTime: 2021-08-24 14:56:13
 * @Description:
 */
import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { markdownPlugin } from './markdown-plugin';

export default defineConfig({
  build: {
    lib: {
      name: 'md-editor',
      entry: 'lib/index.ts'
    },
    rollupOptions: {
      external: ['vue']
    }
  },
  plugins: [vue(), vueJsx(), markdownPlugin()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
