import { cloneDeep } from 'lodash-es';

const defaultState = {
  status: 'normal'
};

const mutations = {
  statusUpdate(state, payload) {
    state.status = payload;
  }
};
const actions = {
  statusUpdate(context, payload) {
    context.commit('statusUpdate', payload);
  }
};
const getters = {
  statusGet: state => state.status
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
