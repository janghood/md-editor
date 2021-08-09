import { createApp } from 'vue'
import App from './App.vue'
import commonComponents from './components'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '/src/style/index.css'
import '/src/style/prism-nord.css'

const app = createApp(App);
app.use(commonComponents)
  .use(ElementPlus)
  .mount('#app')
