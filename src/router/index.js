import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { authRoutes } from './authRoutes';
import { clientRoutes } from './clientRoutes';
import { TenantPanelRoutes } from './TenantPanelRoutes';
import { generalRoutes } from './generalRoutes';
import { TenantPublicRoutes } from './TenantPublicRoutes';
import { SubscriptionRoutes } from './subscriptionRoutes';
import { get } from 'lodash-es';

Vue.use(VueRouter);

const routes = [
  ...TenantPanelRoutes,
  ...TenantPublicRoutes,
  ...clientRoutes,
  ...generalRoutes,
  ...authRoutes,
  ...SubscriptionRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function isRouteChangingUpdate(value) {
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
  }

  // is not public
  else {
    const hasBeenAuthenticated = store.getters['auth/isAuthenticated'];
    if (hasBeenAuthenticated) {
      // don't wait for ping
      next();
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

  isRouteChangingUpdate(false);
});

export default router;
