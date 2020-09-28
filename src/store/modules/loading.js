export default {
  namespaced: true,
  state: {
    refCount: 0,
    loading: true
  },
  mutations: {
    loadingUpdate(state, payload) {
      state.loading = payload;
    },
    refCountIncrease(state) {
      state.refCount++;
    },
    refCountDecrease(state) {
      state.refCount--;
    }
  },
  actions: {
    loadingUpdate({ commit, state }, payload) {
      if (payload) {
        commit('refCountIncrease');
        commit('loadingUpdate', true);
      } else if (state.refCount > 0) {
        commit('refCountDecrease');
        commit('loadingUpdate', state.refCount > 0);
      }
    }
  },
  getters: {
    loadingGet(state) {
      return state.loading;
    }
  }
};
