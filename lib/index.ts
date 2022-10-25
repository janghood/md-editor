/*
 * @Author: 望海潮
 * @Date: 2021-08-20 17:08:02
 * @LastEditTime: 2021-08-22 22:43:35
 * @Description:
 */
import { App } from 'vue';
import { default as MMdEditor } from './mdEditor';

const components = [
  MMdEditor
];

export {
  MMdEditor
}

export function createMMdEditor() {
  return {
    install: (app: App) => {
      components.forEach(component => {
        app.use(component);
      });
      return app;
    }
  }
}
