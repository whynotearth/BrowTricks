import Vue from 'vue';
import { PmuQuestionService } from '@whynotearth/meredith-axios';

const state = {
  questions: {
    // [tenantSlug]: [...questions]
  }
};

const getters = {
  page(state) {
    return state.page;
  }
};

const actions = {
  addQuestions(context, payload) {
    return PmuQuestionService.questions(payload).then(response => {
      console.log('response', response);
    });
  },
  fetchQuestions(context, payload) {
    console.log('payload', payload);
    const tenantSlug = payload.params.tenantSlug;
    return PmuQuestionService.questions1(payload.params).then(response => {
      context.commit('updateQuestions', { tenantSlug, questions: response });
      console.log('response', response);
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
