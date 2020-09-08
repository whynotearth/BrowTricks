import { cloneDeep } from 'lodash-es';
import { randomId } from '@/helpers.js';

function generateEmptyTemplate() {
  return (() => ({
    id: randomId(8),
    title: 'Untitled',
    fields: []
  }))();
}

function generateEmptyField(type) {
  return (() => ({
    id: randomId(8),
    type
  }))();
}

const defaultState = {
  currentField: {},
  currentTemplate: {}
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
  currentFieldReset(context, type) {
    const newField = generateEmptyField(type);
    context.commit('currentFieldUpdate', {});
    return newField;
  },
  currentTemplateUpdate(context, payload) {
    context.commit('currentTemplateUpdate', payload);
  },
  currentTemplateReset(context) {
    const newForm = generateEmptyTemplate();
    context.commit('currentTemplateUpdate', newForm);
    return newForm;
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
