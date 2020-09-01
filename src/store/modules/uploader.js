const getters = {
  uploadedFilesGet(state) {
    return state.uploadedFiles;
  },
  isOpenDrawerUploadGet(state) {
    return state.isOpenDrawerUpload;
  }
};

const actions = {
  uploadedFilesUpdate(context, payload) {
    context.commit('uploadedFilesUpdate', payload);
  },
  isOpenDrawerUploadUpdate(context, payload) {
    context.commit('isOpenDrawerUploadUpdate', payload);
  }
};

const mutations = {
  uploadedFilesUpdate(state, payload) {
    state.uploadedFiles = payload;
  },
  isOpenDrawerUploadUpdate(state, payload) {
    state.isOpenDrawerUpload = payload;
  }
};

export default {
  namespaced: true,
  state: {
    uploadedFiles: [],
    isOpenDrawerUpload: false
  },
  getters,
  actions,
  mutations
};
