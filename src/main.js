import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/global/index.css';

createApp(App)
  .use(router)
  .mount('#app')
