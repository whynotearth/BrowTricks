import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { authRoutes } from './authRoutes';
import { clientRoutes } from './clientRoutes';
import { generalRoutes } from './generalRoutes';
import { TenantPublicRoutes } from './TenantPublicRoutes';
import { get } from 'lodash-es';

Vue.use(VueRouter);

const routes = [
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

function isRouteChangingUpdate(value) {
  console.log('add loading', value);
  store.commit('loading/loading', value);
}

router.beforeEach((to, from, next) => {
  isRouteChangingUpdate(true);

  // is public
  if (to.meta.isPublic) {
    if (to.meta.needsUserInfo) {
      store.dispatch('auth/ping').catch(() => {
        console.log('Not authenticated');
      });
    }
    next();
    isRouteChangingUpdate(false);
  }

  // is not public
  else {
    const hasBeenAuthenticated = store.getters['auth/isAuthenticated'];
    if (hasBeenAuthenticated) {
      // don't wait for ping
      next();
      isRouteChangingUpdate(false);
    }

    store
      .dispatch('auth/ping')
      .then(response => {
        const isAuthenticated = response && response.isAuthenticated;
        if (isAuthenticated) {
          // only runs if isAuthenticated is changed right now
          next();
        } else {
          next({ name: 'Welcome' });
        }
      })
      .catch(error => {
        console.log('Not authenticated');
        const isError401 = get(error, 'response.status', null) === 401;
        if (isError401) {
          next({ name: 'Welcome' });
        }
      });
  }
});

export default router;
