import { cloneDeep } from 'lodash-es';

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
      _disableScrollbars();
    } else {
      _enableScrollbars();
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

function _disableScrollbars() {
  document.body.classList.add('overflow-hidden');
}
function _enableScrollbars() {
  document.body.classList.remove('overflow-hidden');
}
