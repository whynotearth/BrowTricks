import { cloneDeep } from 'lodash-es';

const defaultState = {
  isDrawerOpen: false
};

const mutations = {
  isDrawerOpenUpdate(state, payload) {
    state.isDrawerOpen = payload;
  }
};
const actions = {};
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
