export default {
  namespaced: true,
  state: {
    refCount: 0,
    isLoading: true
  },
  mutations: {
    loading(state, isLoading) {
      if (isLoading) {
        state.refCount++;
        state.isLoading = true;
      } else if (state.refCount > 0) {
        state.refCount--;
        state.isLoading = state.refCount > 0;
      }
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    }
  }
};
