import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { clientRoutes } from './clientRoutes';
import { TenantPanelRoutes } from './TenantRoutes';
import { generalRoutes } from './generalRoutes';
import { formTemplateRoutes } from './formTemplateRoutes';
import { get } from 'lodash-es';

Vue.use(VueRouter);

const routes = [
  ...formTemplateRoutes,
  ...TenantPanelRoutes,
  ...clientRoutes,
  ...generalRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function isRouteChangingUpdate(value) {
  store.dispatch('loading/loadingUpdate', value);
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
          next({ name: 'Home' });
        }
      })
      .catch(error => {
        console.log('Not authenticated');
        const isError401 = get(error, 'response.status', null) === 401;
        if (isError401) {
          next({ name: 'Home' });
        }
      });
  }

  isRouteChangingUpdate(false);
});

export default router;
