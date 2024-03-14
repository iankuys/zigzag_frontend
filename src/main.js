import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('api_host', 'https://data.mind.uci.edu/zigzag_backend');
app.mount('#app')
