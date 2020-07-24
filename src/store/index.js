import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import tenant from './modules/tenant';
import client from './modules/client';
import PMU from './modules/PMU';
import overlay from './modules/overlay';

import VuexPersistence from 'vuex-persist';

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['auth', 'tenant'],
  key: 'vuexSessionStore'
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['client'],
  key: 'vuexLocalStore'
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexSession.plugin, vuexLocal.plugin],
  state: {
    isMenuDrawerOpen: false,
    // FIXME : temporary hardcoded tenantName for testing purposes
    tenantName: 'Boise Brow Queen'
  },
  getters: {
    getTenantName(state) {
      return state.tenantName;
    },
    getIsMenuDrawerOpen(state) {
      return state.isMenuDrawerOpen;
    }
  },
  mutations: {
    toggleMenuDrawer(store) {
      store.isMenuDrawerOpen = !store.isMenuDrawerOpen;
    }
  },
  actions: {},
  modules: {
    auth,
    tenant,
    client,
    PMU,
    overlay
  }
});
