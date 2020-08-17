import { cloneDeep } from 'lodash-es';

const defaultState = {
  isDrawerOpen: false,
  isRouteChanging: false
};

const mutations = {
  isDrawerOpenUpdate(state, payload) {
    state.isDrawerOpen = payload;
  },
  isRouteChangingUpdate(state, payload) {
    state.isRouteChanging = payload;
  }
};
const actions = {
  isRouteChangingUpdate({ commit }, payload) {
    commit('isRouteChangingUpdate', payload);
  }
};
const getters = {
  isDrawerOpen(state) {
    return state.isDrawerOpen;
  },
  isRouteChanging(state) {
    return state.isRouteChanging;
  }
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
