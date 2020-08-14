import Vue from 'vue';
import App from './App.vue';
import '@/meredith-axios-init.js';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/app.css';
import Vuelidate from 'vuelidate';

import SmoothPicker from 'vue-smooth-picker';
import 'vue-smooth-picker/dist/css/style.css';

Vue.use(SmoothPicker);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

console.log('Run main.');
