import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')