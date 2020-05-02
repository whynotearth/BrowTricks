import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuDrawerOpen: false
  },
  getters: {
    isMenuDrawerOpen(state) {
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
