import {
  ClientMediaService,
  ClientService,
  ClientNoteService,
  FormAnswerService
} from '@whynotearth/meredith-axios';

const state = {
  clients: [],
  clientInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notificationTypes: ['email', 'text'], // values here [email, text, whatsapp]
    images: [],
    files: [],
    pmu: [],
    notes: []
  },
  page: 1
};

const getters = {
  clients(state) {
    return state.clients;
  },
  clientInfo(state) {
    return state.clientInfo;
  },
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
  createClient(context, { params }) {
    const _params = {
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      ...params
    };
    return ClientService.clients(_params);
  },
  updateClient(context, { params }) {
    const _params = {
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      ...params
    };
    return ClientService.clients2(_params);
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
    return ClientNoteService.notes2(payload);
  },
  updateClientNote(context, payload) {
    // same as create, just with a payload containing an id
    return ClientNoteService.notes2(payload);
  },
  deleteClientNote(context, payload) {
    return ClientNoteService.notes(payload);
  },

  pmuSendFormLink(context, { params }) {
    return FormAnswerService.notify(params);
  },
  pmuEmptyPngPreview(context, { params }) {
    // NOTE: this is equal to tenant/pmuEmptyPreview
    return FormAnswerService.png(params);
  },
  pmuFilledPreview(context, { params }) {
    return FormAnswerService.preview1(params);
  },
  pmuSignSubmitAnswers(context, { params }) {
    return FormAnswerService.answer(params);
  },
  imageAdd(context, { params }) {
    return ClientMediaService.images(params);
  },
  videoAdd(context, { params }) {
    return ClientMediaService.videos(params);
  },
  imageDelete(context, { params }) {
    return ClientMediaService.images1(params);
  },
  videoDelete(context, { params }) {
    return ClientMediaService.videos1(params);
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
