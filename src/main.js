import './assets/styles.css'; // Import your CSS file here

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.provide('api_host', 'http://127.0.0.1:8000'); 
app.mount('#app')
