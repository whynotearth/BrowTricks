import { ajax } from '@/services/ajax.js';

const state = {
  clients: [],
  clientInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notificationTypes: [],
    images: [],
    files: [],
    pmu: [],
    notes: []
  },
  page: 1
};

const getters = {
  page(state) {
    return state.page;
  }
};

const actions = {
  fetchClients({ commit }, tenantSlug) {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    return new Promise((resolve, reject) => {
      ajax.get(`/${companySlug}/tenant/${tenantSlug}/clients`).then(
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
  },
  async createClient({ state }, payload) {
    const clientData = await {
      tenantSlug: payload.tenantSlug,
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      firstName: state.clientInfo.firstName,
      lastName: state.clientInfo.lastName,
      phoneNumber: state.clientInfo.phoneNumber,
      email: state.clientInfo.email,
      notificationTypes: state.clientInfo.notificationTypes
    };
    return new Promise((resolve, reject) => {
      ajax
        .post(
          `/${clientData.companySlug}/tenant/${clientData.tenantSlug}/clients`,
          clientData
        )
        .then(
          response => {
            resolve(response.data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
};

const mutations = {
  updateClients(state, payload) {
    state.clients = payload;
  },
  pageChange(state, payload) {
    state.page = payload;
  },
  updateFirstName(state, payload) {
    state.clientInfo.firstName = payload;
  },
  updateLastName(state, payload) {
    state.clientInfo.lastName = payload;
  },
  updatePhone(state, payload) {
    state.clientInfo.phoneNumber = payload;
  },
  updateEmail(state, payload) {
    state.clientInfo.email = payload;
  },
  updateSelectedNotificationTypes(state, payload) {
    state.clientInfo.notificationTypes = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
