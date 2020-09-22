import Vue from 'vue';
import App from './App.vue';
import '@/meredith-axios-init.js';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/app.css';
import Vuelidate from 'vuelidate';
import vClickOutside from 'v-click-outside';
import configureModerator from './store/store-moderator';
import PortalVue from 'portal-vue';
import SmoothPicker from 'vue-smooth-picker';
import 'vue-smooth-picker/dist/css/style.css';
// global components
import Button from '@/components/inputs/Button.vue';
Vue.component('Button', Button);

Vue.use(SmoothPicker);
Vue.use(Vuelidate);
Vue.use(vClickOutside);
Vue.use(PortalVue);

Vue.config.productionTip = false;
async function main() {
  await configureModerator(store, router);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

main();
console.log('Run main.');
