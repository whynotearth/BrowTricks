import Vue from 'vue';
import { PmuQuestionService } from '@whynotearth/meredith-axios';

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
  addQuestions(context, payload) {
    return PmuQuestionService.questions(payload);
  },
  fetchQuestions(context, payload) {
    const tenantSlug = payload.params.tenantSlug;
    return PmuQuestionService.questions1(payload.params).then(response => {
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
