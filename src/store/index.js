import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

import VuexPersistence from 'vuex-persist';

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['auth'],
  key: 'vuexSessionStore'
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexSession.plugin],
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
    auth
  }
});
