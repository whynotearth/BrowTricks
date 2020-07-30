import axios from 'axios';
// import store from '@/store';

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
    if (!error.response) {
      // We can handle no connection here, e.g. show a toast message
    }
    if (error.response && error.response.status === 403) {
      alert(
        `Incorrect permissions! If you think something is wrong, please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
      );
    }
    return Promise.reject(error);
  }
);

export { ajax };
