import { ajax } from '@/services/ajax.js';
import { getAPIURL } from '../../helpers';

const state = {
  provider: '',
  returnURL: ''
};

const getters = {
  oauth(state) {
    return getAPIURL(
      `/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.returnURL}`
    );
  }
};

const actions = {
  ping({ commit }) {
    return new Promise((resolve, reject) => {
      // TODO: use meredith-axios
      ajax
        .get('/api/v0/authentication/ping')
        .then(response => {
          commit('updateProvider', response.data.loginProviders[0]);
          resolve(response.data);
        })
        .catch(error => {
          commit('updateProvider', '');
          reject(error);
        });
    });
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // TODO: use meredith-axios
      ajax
        .post(
          `/api/v0/authentication/provider/logout?provider=${state.provider}`
        )
        .then(
          () => {
            commit('updateProvider', '');
            dispatch('updateToken', null);
            resolve('Log Out Successful');
          },
          error => {
            reject(error);
          }
        );
    });
  },
  updateToken(store, payload) {
    if (payload) {
      ajax.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
    } else {
      delete ajax.defaults.headers.common['Authorization'];
    }
  }
};

const mutations = {
  updateProvider(state, payload) {
    state.provider = payload;
  },
  updateReturnUrl(state, payload) {
    state.returnURL = `${payload}?signUpStarted=true`;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
