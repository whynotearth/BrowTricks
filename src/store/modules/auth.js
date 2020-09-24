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
  register({ dispatch }, { params }) {
    return new Promise((resolve, reject) => {
      AuthenticationService.register(params)
        .then(async token => {
          await dispatch('updateToken', token);

          dispatch('ping')
            .then(resolve)
            .catch(error => {
              console.error('Could not get user data after successful login');
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async loginStandard({ dispatch }, { params }) {
    return AuthenticationService.login(params)
      .then(token => dispatch('updateToken', token))
      .then(async () => await dispatch('ping'));
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
      AuthenticationService.ping()
        .then(response => {
          console.log('response', response);
          commit('updateProvider', response.loginProviders[0]);
          commit('updateUserName', response.userName);
          dispatch('updateToken', state.token);
          resolve(response);
        })
        .catch(error => {
          dispatch('clear');
          reject(error);
        });
    });
  },
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      const service = state.provider
        ? AuthenticationService.logout1
        : AuthenticationService.logout;
      const serviceParams = state.provider ? { provider: state.provider } : {};
      service(serviceParams)
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
