import { BASE_API } from '@/connection/api';
import axios from 'axios';
import store from '@/store';
import { getAuthHeaders } from '@/helpers';

const ajax = axios.create({
  baseURL: BASE_API,
  timeout: 20000,
  // withCredentials should be here and moving it to default headers wont work
  withCredentials: true
});

ajax.defaults.headers = {
  'Content-Type': 'application/json'
  // 'Accept-Language': 'en-US,en;q=0.5'
};

ajax.interceptors.request.use(
  config => {
    store.commit('loading/loading', true);
    config = addAuthHeaders(config);
    return config;
  },
  error => {
    store.commit('loading/loading', false);
    return Promise.reject(error);
  }
);
ajax.interceptors.response.use(
  response => {
    store.commit('loading/loading', false);
    return response;
  },
  error => {
    store.commit('loading/loading', false);
    // TODO: handle no connection
    // const status = error.response && error.response.status;
    if (error.response.status === 401) {
      store.commit('auth/logout');
    }
    if (error.response.status === 403) {
      alert(
        'Incorrect permissions, please contact your account owner chris@whynot.earth'
      );
    }
    return Promise.reject(error);
  }
);

export { ajax };

function addAuthHeaders(config) {
  const authHeaders = getAuthHeaders();
  if (authHeaders) {
    config.headers = { ...config.headers, ...authHeaders };
  }
  return config;
}
