import { ajax } from '@/services/ajax.js';

const state = {
  clients: [],
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

const getters = {};

const actions = {
  fetchClients({ commit }, tenantSlug) {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    return new Promise((resolve, reject) => {
      ajax.get(`/${companySlug}/tenants/${tenantSlug}/clients`).then(
        response => {
          commit('updateClients', response.data);
          resolve(response.data);
        },
        error => {
          commit('updateClients', []);
          reject(error);
        }
      );
    });
  }
};

const mutations = {
  updateClients(state, payload) {
    state.clients = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
