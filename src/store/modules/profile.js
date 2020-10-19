import { cloneDeep } from 'lodash-es';
import { ProfileService } from '@whynotearth/meredith-axios';

const defaultState = {};

const mutations = {};
const actions = {
  profileFetch() {
    return ProfileService.profile();
  },
  profileUpdate(context, { params }) {
    return ProfileService.profile1(params);
  }
};
const getters = {};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
