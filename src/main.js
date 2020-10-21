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
import Rollbar from 'rollbar';
import VueSignaturePad from 'vue-signature-pad';
// global components
// -----------------
import Button from '@/components/inputs/Button.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
// -----------------
Vue.component('Button', Button);
Vue.component('TextAreaInput', TextAreaInput);
Vue.component('MaterialInput', MaterialInput);
Vue.component('PageContentBoard', PageContentBoard);

Vue.use(Vuelidate);
Vue.use(vClickOutside);
Vue.use(PortalVue);
Vue.use(VueSignaturePad);

Vue.prototype.$rollbar = new Rollbar({
  accessToken: '9912db541f8c42d88dc9a147d49062ef',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV != 'production' ? 'staging' : 'production'
  }
});

Vue.config.errorHandler = (err, vm) => {
  vm.$rollbar.error(err);
  throw err;
};

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
