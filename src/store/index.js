import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import auth from './modules/auth';
import tenant from './modules/tenant';
import client from './modules/client';
import overlay from './modules/overlay';
import loading from './modules/loading';
import uploader from './modules/uploader';
import formTemplate from './modules/formTemplate';
import profile from './modules/profile';
import alerter from './modules/alerter';
import VuexPersistence from 'vuex-persist';

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['auth', 'uploader', 'formTemplate'],
  key: 'vuexSessionStore'
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // TODO: move client to sessionStorage
  modules: ['client'],
  key: 'vuexLocalStore'
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexSession.plugin, vuexLocal.plugin],
  modules: {
    alerter,
    profile,
    formTemplate,
    global,
    auth,
    tenant,
    client,
    overlay,
    loading,
    uploader
  }
});
