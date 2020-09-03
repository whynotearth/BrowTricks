import { cloneDeep } from 'lodash-es';
import { disableScrollbar, enableScrollbar } from '@/helpers.js';

const defaultState = {
  isDrawerOpen: false,
  isDrawerOpenAuth: false
};

const mutations = {
  isDrawerOpenUpdate(state, payload) {
    state.isDrawerOpen = payload;
  },
  isDrawerOpenAuthUpdate(state, payload) {
    state.isDrawerOpenAuth = payload;
  }
};
const actions = {
  isDrawerOpenUpdate({ commit }, payload) {
    if (payload) {
      disableScrollbar();
    } else {
      enableScrollbar();
    }

    commit('isDrawerOpenUpdate', payload);
  },
  isDrawerOpenAuthUpdate({ commit }, payload) {
    commit('isDrawerOpenAuthUpdate', payload);
  }
};
const getters = {
  isDrawerOpen(state) {
    return state.isDrawerOpen;
  },
  isDrawerOpenAuthGet(state) {
    return state.isDrawerOpenAuth;
  }
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
