import Vue from 'vue';
import { PmuQuestionService, ClientService } from '@whynotearth/meredith-axios';
import HelloSign from 'hellosign-embedded';

const state = {
  questions: {
    // [tenantSlug]: [...questions]
  }
};

const getters = {
  tenantQuestions: state => tenantSlug => {
    return state.questions[tenantSlug] || [];
  }
};

const actions = {
  addQuestions(context, { params }) {
    return PmuQuestionService.questions(params);
  },
  fetchQuestions(context, payload) {
    const tenantSlug = payload.params.tenantSlug;
    return PmuQuestionService.questions1(payload.params).then(response => {
      context.commit('updateQuestions', { tenantSlug, questions: response });
    });
  },
  submitAnswers(context, { params }) {
    // params: clientId, tenantSlug, body
    const { tenantSlug } = params;
    return ClientService.pmu(params).then(response => {
      context.commit('updateQuestions', { tenantSlug, questions: response });
    });
  },
  getSignUrl(context, { params }) {
    return ClientService.sign(params).then(response => {
      return response;
    });
  },
  submitSign(context, editUrl) {
    // doc: https://app.hellosign.com/api/embeddedTemplatesWalkthrough
    const client = new HelloSign({
      clientId: process.env.VUE_APP_HELLO_SIGN_API_KEY
    });
    client.open(editUrl);
  }
};

const mutations = {
  updateQuestions(state, { tenantSlug, questions }) {
    Vue.set(state.questions, tenantSlug, questions);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
