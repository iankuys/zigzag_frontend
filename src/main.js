import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

async function getPatientData(){
    const url = `http://127.0.0.1:5000/get_data`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data)
    return data
}
