import { cloneDeep } from 'lodash-es';

const defaultState = {
  currentField: {},
  currentTemplate: {
    id: null,
    title: 'Untitled',
    fields: []
  }
};

const mutations = {
  currentFieldUpdate(state, payload) {
    state.currentField = payload;
  },
  currentTemplateUpdate(state, payload) {
    state.currentTemplate = payload;
  }
};
const actions = {
  currentFieldUpdate(context, payload) {
    context.commit('currentFieldUpdate', payload);
  },
  currentTemplateUpdate(context, payload) {
    context.commit('currentTemplateUpdate', payload);
  }
};
const getters = {
  currentFieldGet: state => state.currentField,
  currentTemplateGet: state => state.currentTemplate
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
