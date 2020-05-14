import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
  modules: {}
});
