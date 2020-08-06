import Vue from 'vue';
import { ClientService } from '@whynotearth/meredith-axios';
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
  // Set custom questions and get signUrl in response
  setCustomQuestions(context, { params }) {
    return ClientService.pmu(params);
  },
  submitSign(context, signUrl) {
    return new Promise(resolve => {
      // doc: https://app.hellosign.com/api/embeddedTemplatesWalkthrough
      const client = new HelloSign({
        clientId: process.env.VUE_APP_HELLO_SIGN_API_KEY
      });
      client.open(signUrl);
      client.on('sign', data => {
        console.log('The document has been signed!');
        console.log('Signature ID: ' + data.signatureId);
        resolve(data);
      });
    });
  },
  signed(context, payload) {
    return ClientService.signed(payload.params);
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
