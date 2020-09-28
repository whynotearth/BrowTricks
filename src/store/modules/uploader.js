const getters = {
  uploadedFilesGet(state) {
    return state.uploadedFiles;
  },
  openDrawerUploadGet(state) {
    return state.openDrawerUpload;
  }
};

const actions = {
  uploadedFilesUpdate(context, payload) {
    context.commit('uploadedFilesUpdate', payload);
  },
  openDrawerUploadUpdate(context, payload) {
    context.commit('openDrawerUploadUpdate', payload);
  }
};

const mutations = {
  uploadedFilesUpdate(state, payload) {
    state.uploadedFiles = payload;
  },
  openDrawerUploadUpdate(state, payload) {
    state.openDrawerUpload = payload;
  }
};

export default {
  namespaced: true,
  state: {
    uploadedFiles: [],
    openDrawerUpload: null
  },
  getters,
  actions,
  mutations
};
