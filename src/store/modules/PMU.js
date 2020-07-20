const state = {
  page: 1
};

const getters = {
  page(state) {
    return state.page;
  }
};

const actions = {};

const mutations = {
  pageChange(state, payload) {
    state.page = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
