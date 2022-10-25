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

const install = function (app: App) {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};

export {
  MMdEditor
}

export const createMdEditor = () => {
  return {
    install
  }
}
