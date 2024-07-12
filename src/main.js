import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'

import './assets/scss/main.scss'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')