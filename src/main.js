import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('api_host', 'http://127.0.0.1:4997/zigzag_backend'); 
app.mount('#app')
