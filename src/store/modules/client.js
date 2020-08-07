import { ClientService, ClientNoteService } from '@whynotearth/meredith-axios';

const state = {
  clients: [],
  clientInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notificationTypes: ['email'],
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
        response.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
          const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        commit('updateClients', response);
      })
      .catch(() => {
        commit('updateClients', []);
      });
  },
  fetchClient(context, { params }) {
    // params = { tenantSlug, clientId }
    return ClientService.clients3(params);
  },
  createClient({ state, commit }, payload) {
    const clientData = {
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
    return ClientService.clients(clientData).then(() => {
      commit('resetClientInfo');
    });
  },
  updateClient(context, payload) {
    const clientData = {
      tenantSlug: payload.tenantSlug,
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      clientId: payload.clientId,
      body: { ...payload.body }
    };
    return ClientService.clients2(clientData);
  },
  archiveClient(context, payload) {
    const clientData = {
      tenantSlug: payload.tenantSlug,
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      clientId: payload.clientId
    };
    return ClientService.archive(clientData);
  },
  fetchClientNotes(context, payload) {
    return ClientNoteService.notes1(payload);
  },
  createClientNote(context, payload) {
    return ClientNoteService.notes(payload);
  },
  updateClientNote(context, payload) {
    // No update endpoint is available
    return ClientNoteService.notes(payload);
  },
  deleteClientNote(context, payload) {
    return ClientNoteService.notes2(payload);
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
  },
  setClientInfo(state, payload) {
    state.clientInfo = {
      ...state.clientInfo,
      ...payload
    };
  },
  resetClientInfo(state) {
    state.clientInfo = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      notificationTypes: ['email'],
      images: [],
      files: [],
      pmu: [],
      notes: []
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
