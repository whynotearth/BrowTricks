const getters = {
  uploadedFilesGet(state) {
    return state.uploadedFiles;
  }
};

const actions = {
  uploadedFilesUpdate(context, payload) {
    context.commit('uploadedFilesUpdate', payload);
  }
};

const mutations = {
  uploadedFilesUpdate(state, payload) {
    state.uploadedFiles = payload;
  }
};

export default {
  namespaced: true,
  state: {
    uploadedFiles: []
  },
  getters,
  actions,
  mutations
};
