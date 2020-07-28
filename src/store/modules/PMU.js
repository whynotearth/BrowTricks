import Vue from 'vue';
import { PmuQuestionService, ClientService } from '@whynotearth/meredith-axios';

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
