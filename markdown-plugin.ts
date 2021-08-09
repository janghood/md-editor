/*
 * @Author: 望海潮
 * @Date: 2021-08-07 23:16:41
 * @LastEditTime: 2021-08-09 17:35:02
 * @Description: 
 */
import { dataToEsm } from '@rollup/pluginutils';

export const markdownPlugin = () =>
({
  name: 'vite-plugin-markdown',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.endsWith('.md')) return null;

    return dataToEsm(code);
  },
} as const);
