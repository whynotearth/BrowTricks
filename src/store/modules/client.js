import { ajax } from '@/services/ajax.js';

const state = {
  clientInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notificationType: [],
    images: [],
    files: [],
    pmu: [],
    notes: []
  }
};

const getters = {
};

const actions = {
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
