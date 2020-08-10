import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { authRoutes } from './authRoutes';
import { PmuRoutes } from './PmuRoutes';
import { clientRoutes } from './clientRoutes';
import { generalRoutes } from './generalRoutes';
import { TenantPublicRoutes } from './TenantPublicRoutes';

Vue.use(VueRouter);

const routes = [
  ...PmuRoutes,
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
  console.log('to.meta.isPublic', to.meta.isPublic);
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
