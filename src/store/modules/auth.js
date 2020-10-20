import { ajax } from '@/services/ajax.js';
import { getAPIURL } from '@/helpers';
import { AuthenticationService } from '@whynotearth/meredith-axios';
import { get } from 'lodash-es';

const state = {
  provider: '',
  returnURL: '',
  token: ''
};

const getters = {
  oauthUrlGet(state) {
    return getAPIURL(
      `/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.returnURL}`
    );
  },
  isAuthenticated(state) {
    return Boolean(state.token);
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
    try {
      const token = await AuthenticationService.login(params);
      await dispatch('updateToken', token);
      await dispatch('ping');
      return true;
    } catch (error) {
      console.log('Error in standard login');
      throw error;
    }
  },
  ping({ commit, dispatch }) {
    return AuthenticationService.ping()
      .then(async response => {
        commit('updateProvider', response.loginProviders[0]);
        return response;
      })
      .catch(error => {
        const status = get(error, 'response.status');
        if (status === 401) {
          dispatch('clear');
        }
        throw error;
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
    if (payload) {
      localStorage.setItem('auth_token', payload);
      ajax.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
      commit('updateToken', payload);
    } else {
      localStorage.removeItem('auth_token');
      delete ajax.defaults.headers.common['Authorization'];
      commit('updateToken', '');
    }
  },
  refreshToken({ dispatch }) {
    const token = localStorage.getItem('auth_token');
    dispatch('updateToken', token);
  },
  // sms verification
  requestVerifyCode() {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    const params = {
      body: { companySlug }
    };
    return AuthenticationService.confirmphonetoken(params);
  },
  requestVerifyEmail(context, { params }) {
    return AuthenticationService.confirmemailtoken(params);
  },
  submitVerifyCode(context, { params }) {
    return AuthenticationService.confirmphone(params);
  },
  submitVerifyEmail(context, { params }) {
    return AuthenticationService.confirmemail(params);
  },
  forgotPassword(context, { params }) {
    return AuthenticationService.forgotpassword(params);
  },
  resetPassword(context, { params }) {
    return AuthenticationService.forgotpasswordreset(params);
  },
  clear({ commit }) {
    commit('updateReturnUrl', '');
    commit('updateProvider', '');
  }
};

const mutations = {
  updateToken(state, payload) {
    state.token = payload;
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
