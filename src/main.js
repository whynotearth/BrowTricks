import Vue from 'vue';
import App from './App.vue';
import '@/meredith-axios-init.js';
import './registerServiceWorker';
import VueGtm from 'vue-gtm';
import router from './router';
import store from './store';
import './assets/styles/app.css';
import Vuelidate from 'vuelidate';
import vClickOutside from 'v-click-outside';
import configureModerator from './store/store-moderator';
import PortalVue from 'portal-vue';
import Rollbar from 'rollbar';
import VueMeta from 'vue-meta';
// global components
// -----------------
import Button from '@/components/inputs/Button.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import BaseDialog from '@/components/BaseDialog.vue';
// -----------------
Vue.component('Button', Button);
Vue.component('TextAreaInput', TextAreaInput);
Vue.component('MaterialInput', MaterialInput);
Vue.component('PageContentBoard', PageContentBoard);
Vue.component('BaseDialog', BaseDialog);

Vue.use(Vuelidate);
Vue.use(vClickOutside);
Vue.use(PortalVue);
Vue.use(VueMeta);

console.log('process.env.CONTEXT', process.env.CONTEXT);

Vue.use(VueGtm, {
  id: ['GTM-K57GPRF'],
  defer: false,
  enabled: true, // Ex: enabled: !!GDPR_Cookie (optional)
  debug: process.env.CONTEXT !== 'production', // Whether or not display console logs debugs (optional)
  loadScript: true,
  vueRouter: router,
  ignoredViews: ['PanelRedirector']
  // trackOnNextTick: false
});

if (process.env.VUE_APP_ROLLBAR) {
  Vue.prototype.$rollbar = new Rollbar({
    accessToken: '9912db541f8c42d88dc9a147d49062ef',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.VUE_APP_ROLLBAR
    }
  });

  Vue.config.errorHandler = (err, vm) => {
    vm.$rollbar.error(err);
    throw err;
  };
}

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
