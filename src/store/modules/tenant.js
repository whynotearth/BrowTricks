import {
  TenantService,
  BrowtricksService,
  FormAnswerService
} from '@whynotearth/meredith-axios';

const state = {};
const getters = {};
const mutations = {};

const actions = {
  pmuEmptyPdfPreview(context, { params }) {
    return FormAnswerService.pdf(params);
  },
  pmuEmptyPngPreview(context, { params }) {
    // NOTE: this is equal to clinet/pmuEmptyPreview
    return FormAnswerService.png(params);
  },

  // without clientId
  pmuFilledPreviewMock(context, { params }) {
    console.log('params', params);
    return FormAnswerService.preview(params);
  },

  createTenant(context, { params }) {
    const _params = {
      ...params,
      companySlug: process.env.VUE_APP_COMPANY_SLUG
    };
    return TenantService.tenants(_params);
  },
  fetchUserTenants() {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    const params = { companySlug };
    return TenantService.mytenants(params);
  },
  fetchTenant(context, { params }) {
    let _params = {
      ...params
    };
    return BrowtricksService.tenants(_params);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
