import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importa Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './assets/fonts.css';

createApp(App)
    .use(router)
    .mount('#app');
