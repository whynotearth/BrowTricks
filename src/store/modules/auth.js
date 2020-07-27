import { ajax } from '@/services/ajax.js';
import { getAPIURL } from '../../helpers';

const state = {
  provider: '',
  returnURL: '',
  token: '',
  userName: ''
};

const getters = {
  oauth(state) {
    return getAPIURL(
      `/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.returnURL}`
    );
  },
  isAuthenticated(state) {
    return Boolean(state.userName);
  },
  userName(state) {
    return state.userName;
  }
};

const actions = {
  ping({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      // TODO: use meredith-axios
      ajax
        .get('/api/v0/authentication/ping')
        .then(response => {
          commit('updateProvider', response.data.loginProviders[0]);
          commit('updateUserName', response.data.userName);
          dispatch('updateToken', state.token);
          resolve(response.data);
        })
        .catch(error => {
          dispatch('clear');
          reject(error);
        });
    });
  },
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      // TODO: use meredith-axios
      ajax
        .post(
          `/api/v0/authentication/provider/logout?provider=${state.provider}`
        )
        .then(() => {
          dispatch('clear');
          dispatch('updateToken', undefined);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateToken({ commit }, payload = '') {
    commit('updateToken', payload);
    if (payload) {
      ajax.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
    } else {
      delete ajax.defaults.headers.common['Authorization'];
    }
  },
  clear({ commit }) {
    commit('updateReturnUrl', '');
    commit('updateProvider', '');
    commit('updateUserName', '');
  }
};

const mutations = {
  updateToken(state, payload) {
    state.token = payload;
  },
  updateUserName(state, payload) {
    state.userName = payload;
  },
  updateProvider(state, payload) {
    state.provider = payload;
  },
  updateReturnUrl(state, payload) {
    state.returnURL = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
