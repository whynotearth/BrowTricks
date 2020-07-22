import axios from 'axios';
import store from '@/store';

const ajax = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
});

ajax.defaults.headers['Content-Type'] = 'application/json';

ajax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // TODO: handle no connection
    if (error.response.status === 401) {
      // FIXME: don't run on public pages
      store.dispatch('auth/logout');
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
