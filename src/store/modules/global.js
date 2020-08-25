import { cloneDeep } from 'lodash-es';
import { disableScrollbar, enableScrollbar } from '@/helpers.js';

const defaultState = {
  isDrawerOpen: false
};

const mutations = {
  isDrawerOpenUpdate(state, payload) {
    state.isDrawerOpen = payload;
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
  }
};
const getters = {
  isDrawerOpen(state) {
    return state.isDrawerOpen;
  }
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
