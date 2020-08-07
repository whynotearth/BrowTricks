import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { authRoutes } from './authRoutes';
import { PMURoutes } from './PMURoutes';
import { clientRoutes } from './clientRoutes';
import { generalRoutes } from './generalRoutes';
// import { TestingRoutes } from './TestingRoutes';
import { TenantPublicRoutes } from './TenantPublicRoutes';

Vue.use(VueRouter);

const routes = [
  ...PMURoutes,
  // ...TestingRoutes,
  ...TenantPublicRoutes,
  ...clientRoutes,
  ...generalRoutes,
  ...authRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    if (to.meta.needsUserInfo) {
      store.dispatch('auth/ping').catch(() => {
        console.log('Not authenticated');
      });
    }
    next();
  } else {
    store
      .dispatch('auth/ping')
      .then(response => {
        const isAuthenticated = response && response.isAuthenticated;
        if (isAuthenticated) {
          next();
        } else {
          next({ name: 'Welcome' });
        }
      })
      .catch(error => {
        console.log('Not authenticated', error);
        next({ name: 'Welcome' });
      });
  }
});

export default router;
