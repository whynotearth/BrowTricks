import { cloneDeep } from 'lodash-es';
import { disableBodyClass, enableBodyClass } from '@/helpers.js';

const defaultState = {
  isDrawerOpen: false,
  isDrawerOpenAuth: false,
  noScrollbarCount: 0
};

const mutations = {
  isDrawerOpenUpdate(state, payload) {
    state.isDrawerOpen = payload;
  },
  isDrawerOpenAuthUpdate(state, payload) {
    state.isDrawerOpenAuth = payload;
  },
  noScrollbarCountIncrease(state) {
    state.noScrollbarCount++;
  },
  noScrollbarCountDecrease(state) {
    state.noScrollbarCount--;
  }
};
const actions = {
  isDrawerOpenUpdate({ commit }, payload) {
    if (payload) {
      enableBodyClass('no-scrollbars');
    } else {
      disableBodyClass('no-scrollbars');
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
  },
  noScrollbarCountGet(state) {
    return state.noScrollbarCount;
  }
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
