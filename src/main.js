import { createApp } from 'vue'
import App from './App.vue'
import commonComponents from './components'
import '/src/style/index.css'
import '/src/style/prism-nord.css'

const app = createApp(App);
app.use(commonComponents)
  .mount('#app')
