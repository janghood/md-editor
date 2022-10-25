/*
 * @Author: 望海潮
 * @Date: 2021-08-22 22:46:25
 * @LastEditTime: 2021-08-24 15:06:14
 * @Description:
 */
import { createApp } from 'vue';
import App from './App.vue';
import { createMMdEditor } from "../lib";

const MdUI = createMMdEditor();

const app = createApp(App);
app.use(MdUI).mount('#app')
