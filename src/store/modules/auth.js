import { ajax } from '@/services/ajax.js';
import { getAPIURL } from '@/helpers';
import { AuthenticationService } from '@whynotearth/meredith-axios';

const state = {
  provider: '',
  returnURL: '',
  token: '',
  userName: ''
};

const getters = {
  oauthUrlGet(state) {
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
  async loginStandard({ dispatch }, { params }) {
    let token;
    try {
      token = await AuthenticationService.login(params);

      await dispatch('updateToken', token);
    } catch (error) {
      throw new Error(error.message);
    }
    const pingResult = await dispatch('ping');

    if (!pingResult) {
      throw new Error('An error occured during login');
    }
  },
  tokenlogin({ dispatch }, { params }) {
    return new Promise((resolve, reject) => {
      // params: {body: {token: 'xyz'}}
      AuthenticationService.tokenlogin(params)
        .then(tokenString => {
          dispatch('updateToken', tokenString);
          resolve(tokenString);
        })
        .catch(error => {
          dispatch('clear');
          reject(error);
        });
    });
  },
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
    state.returnURL = encodeURIComponent(payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
