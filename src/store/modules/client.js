import { ClientService } from '@whynotearth/meredith-axios';

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
    return ClientService.clients1({
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      tenantSlug
    })
      .then(response => {
        commit('updateClients', response);
      })
      .catch(() => {
        commit('updateClients', []);
      });
  },
  async createClient({ state }, payload) {
    const clientData = await {
      tenantSlug: payload.tenantSlug,
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      body: {
        firstName: state.clientInfo.firstName,
        lastName: state.clientInfo.lastName,
        phoneNumber: state.clientInfo.phoneNumber,
        email: state.clientInfo.email,
        notificationTypes: state.clientInfo.notificationTypes
      }
    };
    return ClientService.clients(clientData);
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
